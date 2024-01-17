<script lang="ts">
    import { onMount } from 'svelte';
    

    let tokens = [];
    let links = [];

    onMount(() => {
        // Retrieve data from session storage
        const sessionData = sessionStorage.getItem('service_connections');
        if (sessionData) {
            const serviceConnections = JSON.parse(sessionData);


            console.log('sessionData:', sessionData);


            

        }
       
    });
</script>

<!-- Your component's markup goes here -->
