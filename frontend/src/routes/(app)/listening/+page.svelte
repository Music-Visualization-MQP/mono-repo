<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    import Song from './Song.svelte';
    import Modal from './Modal.svelte';

    let curAlbum:string
    let showModal = false;
    const openModal = (album:string) => {
        showModal = true;
        curAlbum = album
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<h1>Listening Data</h1>
<div class="songs">
    {#if data.songs != null}
        {#each data.songs as song}
            <Song {song}  popup={()=> openModal(song.album)}/>
        {/each}
    {:else}
        <p>No listening data yet!</p>
    {/if}
</div>

<Modal isOpen={showModal} onClose={closeModal} album={curAlbum}>
    <!-- <h1>Details for {curAlbum}
    </h1>
    
    <div class="test">
        hello!!!!! {curAlbum}
    </div> -->
  </Modal>

<style>
    h1 {
        margin-bottom: 20px;
    }

    .songs {
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
    }
</style>