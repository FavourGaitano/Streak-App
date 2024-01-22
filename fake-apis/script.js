let url = "http://localhost:3000/habits/";

// Fetch habits from db.json
function fetchHabits() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            console.log("Fetched response:", JSON.stringify(data) );

            let habits = data|| [];
            console.log("Fetched habits:", habits);

            
            displayHabits(habits);
            
        })
        .catch((error) => {
            console.log( "Error fetching habits:",error);
        });
}

// Function to display habits
function displayHabits(habits) {

    console.log("Received habits in displayHabits:", habits);

    let habitsContainer = document.getElementById("habitsContainer");
    habitsContainer.innerHTML = "";

    habits.forEach((habit) => {
        let habitElement = document.createElement("div");
        habitElement.classList.add("habit");

        let habitName = document.createElement("p");
        habitName.textContent = ` ${habit.name}`;

        let habitDate = document.createElement("p");
        habitDate.textContent = `Date: ${habit.date}`;

        let daysDifference = calculateDaysDifference(new Date(habit.date));
        let daysSinceStopped = document.createElement("p");
        daysSinceStopped.textContent = `Days: ${daysDifference}`;

        habitElement.appendChild(habitName);
        habitElement.appendChild(habitDate);
        habitElement.appendChild(daysSinceStopped);

        habitsContainer.appendChild(habitElement);
    });
}

// Function to calculate days difference
function calculateDaysDifference(stoppedDate) {
    let currentDate = new Date();
    let difference = currentDate - stoppedDate;
    let daysDifference = Math.floor(difference / (1000 * 3600 * 24));
    return daysDifference;
}

let form = document.getElementById("habit-form");

// Add event listener to the form(submit)
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;

    let habit = {
        name,
        date,
    };

    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(habit),
    };

    fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            form.reset();
            fetchHabits();
        })
        .catch((error) => {
            console.log(error);
        });
});

// Fetch habits initially
fetchHabits();
