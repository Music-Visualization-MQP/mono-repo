<script lang="ts">
    // export let showModal:boolean
    export let isOpen = false;
    export let album;
    export let onClose;
  
    const closeModal = () => {
        if (onClose) onClose();
    }
</script>

{#if isOpen}
    <div class="modal-overlay" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            <h1>Details for {album}
            </h1>
            <slot></slot>
            <!-- <button class="close-btn" on:click={closeModal}>Close</button> -->
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
  
    .modal-content {
        display: flex;
        background: rgb(73, 70, 70);
        padding: 1rem;
        border-radius: 8px;
        position: relative;
        max-width: 75%;
        width: 100%;
    }
  
    /* .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    } */
  </style>