<script lang="ts">
    import LinkSpotify from '$lib/components/LinkSpotify.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    $: ({ user } = data);
</script>

<div id="content">
    <form method="POST" action="?/update_profile">
        <input type="text" name="username" id="username" placeholder="username" value={user?.username}>
        <input type="text" name="full_name" id="full_name" placeholder="full name" value={user?.full_name}>
        <input type="text" name="website" id="website" placeholder="website" value={user?.website}>
        <input type="text" name="avatar_url" id="avatar_url" placeholder="avatar url" value={user?.avatar_url}>
        <input type="submit" value="edit profile">
    </form>
    <LinkSpotify />
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
</style>