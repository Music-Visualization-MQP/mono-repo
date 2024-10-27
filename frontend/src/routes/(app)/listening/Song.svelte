<script lang="ts">
    export let song: {
        album_art_path: string
        title: string
        artists: string[]
        album: string
    };
    let details = false
    function displayDetails(){
        details = !details
        console.log(song.title+" clicked!")
    }
</script>

<div class="song" on:click={displayDetails}>
    <img src={song.album_art_path} alt={`The album art for ${song.album}.`}>
    <p class="title">{song.title}</p>
    <p class="artist">{song.artists.join(', ')}</p>
    <p class="album">{song.album}</p>
    
</div>
{#if details}
<div class="details">
    <p>details go here!</p>
</div>
{/if}

<style>
    .song {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 5px;
        border: 2px solid var(--text);
    }

    img {
        width: 50px;
        height: 50px;
    }

    p {
        width: 150px;
    }

    .song:hover {
        outline: 4px solid whitesmoke;
    }
</style>

