<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import MealCard from '../components/MealCard.svelte';

    // props: id passed from route parameter
    let { id } = $props();

    // state to hold the fetched profile data
    let profile = $state(null);

    onMount(async () => {
        try {
            // get guest info from local storage
            const user = JSON.parse(localStorage.getItem('user'));

            // get profile with watchlist from the server with access token
            const response = await axios.get(`http://localhost:8080/users/${id}`, {
                headers: {
                    Authorization: user.header_token // attach token for authorization
                }
            });

            // assign profile to the response
            profile = response.data;
        } catch (error) {
            console.log(error);
        }
    });
</script>

<div class="profile-container">
    {#if !profile}
        <div>Loading User Profile...</div>
    {:else}
        <h1>Welcome, {profile.username}!</h1>
        {#if profile.preferences && profile.preferences.length > 0}
            <div class="preferences">
                <hr />
                <h3>Dietary Preferences:</h3>
                <p>{profile.preferences.join(', ')}</p>
            </div>
        {/if}
        <hr />
        <h2>MealPlans:</h2>
        <div class="meal-plan">
            {#if !profile.mealPlans || profile.mealPlans.length === 0}
                <p>No Mealplans in your list</p>
            {:else}
                {#each profile.mealPlans as mealplan}
                    <div class="mealplan-week">
                        <h3>Week {mealplan.week}</h3>
                        {#each mealplan.meals as meal}
                            <MealCard 
                                image={meal.image} 
                                name={meal.name} 
                                diets={meal.diets}
                            />
                        {/each}
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
</div>

<style>
    .profile-container {
        margin: 2rem auto;
        padding: 2rem;
        text-align: left;
    }

    h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 2rem;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
    }

    .meal-plan {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }
</style>
