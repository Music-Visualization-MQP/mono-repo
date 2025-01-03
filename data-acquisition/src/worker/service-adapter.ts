import { SpotifyUserPlaying, UserPlaying } from "../music/UserPlaying";
import { SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Queue } from "bullmq";
import { connection } from "./redis";
import { makeQueue } from "./makeQueue";
dotenv.config();
/**
 */
/**
 * Asynchronously creates and schedules jobs for Spotify credentials.
 *
 * This function initializes a job queue and connects to a Supabase client to fetch Spotify credentials.
 * For each credential, it adds two jobs to the queue:
 * 1. A one-time job with the user's Spotify credentials.
 * 2. A recurring job that runs every 30 minutes with the user's Spotify credentials.
 *
 * @async
 * @function makeJobs
 * @returns {Promise<void>} A promise that resolves when the jobs have been added to the queue.
 * @todo: add a perameter instead of creating a new queue
 * @todo: deduplicate 
*/
export async function makeJobs() {
  const queue = makeQueue();
  console.log("makeJobs");
  const supabase = new SupabaseClient(
    process.env.SB_URL as string,
    process.env.SERVICE as string,
    { db: { schema: "public" } }
  );
  await supabase
    .from("spotify_credentials")
    .select("*")
    .then((items) => {
      console.log(items);
      items.data?.forEach(async (element) => {
        await queue.add(
          "spotify" + element,
          {
            data: {
              userId: element.id,
              refreshToken: element.refresh_token,
            },
          },
          {
            jobId: "spotify" + element.id,
          }
        );
        await queue.add(
          "spotify" + element,
          {
            data: {
              userId: element.id,
              refreshToken: element.refresh_token,
            },
          },
          {
            repeat: { pattern: "0/30 * * * *" },
            jobId: "spotify" + element.id,
          }
        );
      });
    });
}
