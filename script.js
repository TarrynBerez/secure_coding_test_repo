// TODO: Remove hardcoded secrets
const api_key = "wEu5B7ly30CTYmvmYyIap4jtLj7cpHeKZgqdidTV"
console.log("API KEY: ", api_key)
const imgContainer = document.getElementById("img-container")


document.getElementById("load-photos").addEventListener("click", () => {
    const date = document.getElementById("date-input").value;
    displayMarsPhotos(date);
    imgContainer.innerHTML = "";
    fetch("http://example.com/test");
})


async function displayDefaultPhotos() {
    const defaultDate = "2012-08-06";
    displayMarsPhotos(defaultDate);
}


async function displayMarsPhotos(date) {
    try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=wEu5B7ly30CTYmvmYyIap4jtLj7cpHeKZgqdidTV`)
        if (!response.ok){
            throw new Error(`Error! status: ${response.status}`);
        }
        
        // successful response
        console.log("Successful");
        const data = await response.json();
        imgContainer.innerHTML = "";

        //Gets 3 photos
        const selectedPhotos = data.photos.slice(0, 3);

        //Checks if there photos for that date
        if (data.photos.length === 0){
            const noPhotoMessage = document.createElement("p");
            noPhotoMessage.textContent = `No photos for ${date}. Please enter a valid date.`;
            imgContainer.appendChild(noPhotoMessage);
            return;
        }

        // Gets each photo
        selectedPhotos.forEach(photo => {
            const { img_src, earth_date, camera } = photo;
            const { name: cameraName } = camera;
            const img = document.createElement("img");

            img.src = img_src;
            img.alt = "Mars Rover Photo";
            img.style.width = "auto";
            imgContainer.appendChild(img);
            
            const photoContainer = document.createElement("div");
            const photoInfo = document.createElement("p");

            photoInfo.textContent = `Photo taken on ${earth_date} with the ${cameraName} camera.`;
            photoContainer.appendChild(photoInfo);
            imgContainer.appendChild(photoContainer);
        });


    } catch(error) {
        console.log("Failed to fetch photos");

        // Prints Error Message
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Failed to load mars rover photos. Please enter a valid date.";
        imgContainer.appendChild(errorMessage);
    }
}

displayDefaultPhotos();