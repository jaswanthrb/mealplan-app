<script>
    export let image = '';
    export let name = "";
    export let diets = [];
    export let week = "";

</script>

<div class="meal-card">
    <img class="meal-image" src={image} alt={name}/>
    <div class="meal-info">
        <p class="meal-name">{name}</p>
        <p class="meal-diet">{diets}</p>
        <p class="meal-week">{week}</p>
    </div>
</div>

<style>
     .meal-card {
        background-color: #1d2531;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        max-width: 250px;
        transition: transform 0.2s ease-in-out;
    }

    .meal-card:hover {
        transform: scale(1.05);
    }

    .meal-image {
        width: 100%;
        height: 200px;
        border-radius: 8px;
        object-fit: cover;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .meal-info {
        text-align: center;
    }

    .meal-name {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        margin: 0.5rem 0;
    }

    .meal-diet {
        color: #a8b9b7;
        margin: 0.3rem 0;
    }

    .meal-week {
        font-weight: bold;
        margin-top: 0.3rem;
    }


</style>