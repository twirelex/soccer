let data;
let currentPage = 1;
const videosPerPage = 6;
// Get the search button and input elements
let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("search-input");
//fetch the videos from the server
fetch("/videos?page=" + currentPage)
  .then((response) => response.json())
  .then((dataResponse) => {
    data = dataResponse;
    // Get the video container element
    var videoContainer = document.getElementById("video-container");
    //create function to get the videos according to the page number
    function getVideos(pageNumber) {
      //get the videos for the current page
      fetch("/videos?page=" + pageNumber)
        .then((response) => response.json())
        .then((dataResponse) => {
          data = dataResponse; // update the data variable here
          let videos = data;
          videoContainer.innerHTML = "";
          //loop through the videos and create video cards for each one
          videos.forEach((video) => {
            var newImage = document.createElement("img");
            newImage.src = `photos/${video.title}_${video.goalTime}_${video.game}.png`;
            var newLink = document.createElement("a");
            newLink.href = `video/${video.title}_${video.goalTime}_${video.game}`;
            //create title element
            var newVideoTitle = document.createElement("h3");
            newVideoTitle.innerHTML = `<a href="video/${video.title}_${
              video.goalTime
            }_${video.game}">${video.title.replace(/-/g, " ")}</a>`;

            var newVideoGoalTime = document.createElement("p");
            newVideoGoalTime.innerHTML = `Goal Time: ${video.goalTime}`;
            //create game element
            var newVideoGame = document.createElement("p");
            newVideoGame.innerHTML = `Game: ${video.game}`;
            // create a time posted element
            var newVideoTime = document.createElement("p");
            newVideoTime.innerHTML = `Posted: ${video.timePosted}`;
            //create container element for the video card
            var newVideoCard = document.createElement("div");
            newVideoCard.classList.add("video-card");
            //append all elements to the video card
            newLink.appendChild(newImage);
            newVideoCard.appendChild(newLink);
            newVideoCard.appendChild(newVideoTitle);
            newVideoCard.appendChild(newVideoGoalTime);
            newVideoCard.appendChild(newVideoGame);
            newVideoCard.appendChild(newVideoTime);
            //append video card to the video container
            videoContainer.appendChild(newVideoCard);
          });
        });
    }

    //call the function to get the first page videos
    getVideos(currentPage);
    // Get the pagination container element
    var paginationContainer = document.getElementById("pagination");
    //create function to generate pagination links
    function generatePaginationLinks(pageNumber) {
      paginationContainer.innerHTML = "";
      //calculate the number of pages
      let numberOfPages = Math.ceil(data[0].datalength / videosPerPage);
      let previousLink = document.createElement("a");
      previousLink.innerHTML = "Previous";
      previousLink.addEventListener("click", function () {
        if (currentPage > 1) {
          currentPage--;
          getVideos(currentPage);
          // add the condition here
          let paginationLinks = paginationContainer.getElementsByTagName("a");
          for (let i = 0; i < paginationLinks.length; i++) {
            if (paginationLinks[i].innerHTML == currentPage) {
              paginationLinks[i].style.background = "lightblue";
            } else {
              paginationLinks[i].style.background = "";
            }
          }
        }
      });
      paginationContainer.appendChild(previousLink);

      let start = 1;
      let end = numberOfPages;
      const maxDisplayed = 7; // Number of page links to display

      if (numberOfPages > maxDisplayed) {
        if (currentPage <= Math.floor(maxDisplayed / 2)) {
          start = 1;
          end = maxDisplayed;
        } else if (
          currentPage >=
          numberOfPages - Math.floor(maxDisplayed / 2)
        ) {
          start = numberOfPages - maxDisplayed + 1;
          end = numberOfPages;
        } else {
          start = currentPage - Math.floor(maxDisplayed / 2);
          end = currentPage + Math.floor(maxDisplayed / 2);
        }
      }

      //loop through the number of pages
      for (let i = start; i <= end; i++) {
        let paginationLink = document.createElement("a");
        paginationLink.innerHTML = i;
        if (currentPage === i) {
          paginationLink.style.background = "lightblue";
        }
        paginationLink.addEventListener("click", function () {
          currentPage = i;
          getVideos(currentPage);
          generatePaginationLinks(i);
        });
        paginationContainer.appendChild(paginationLink);
      }

      let nextLink = document.createElement("a");
      nextLink.innerHTML = "Next";
      nextLink.addEventListener("click", function () {
        if (currentPage < numberOfPages) {
          currentPage++;
          getVideos(currentPage);
          // add the condition here
          let paginationLinks = paginationContainer.getElementsByTagName("a");
          for (let i = 0; i < paginationLinks.length; i++) {
            if (paginationLinks[i].innerHTML == currentPage) {
              paginationLinks[i].style.background = "lightblue";
            } else {
              paginationLinks[i].style.background = "";
            }
          }
        }
      });
      paginationContainer.appendChild(nextLink);
    }

    //call the function to generate the pagination links
    generatePaginationLinks(currentPage);
  });
// Add an event listener to the search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); // prevent the form from submitting
  if (searchInput.value.length > 0) {
    let searchTerm = searchInput.value.toLowerCase(); // get the search term from the input
    searchInput.value = "";

    currentPage = 1;
    const videosPerPage = 6;
    // Get the video container element
    var videoContainer = document.getElementById("video-container");
    //create function to get the videos according to the page number
    function getVideos(pageNumber) {
      //get the videos for the current page
      fetch(`/videos/search?searchterm=${searchTerm}&page=${pageNumber}`)
        .then((response) => response.json())
        .then((dataResponse) => {
          data = dataResponse; // update the data variable here
          let videos = data;
          videoContainer.innerHTML = "";
          //loop through the videos and create video cards for each one
          videos.forEach((video) => {
            var newImage = document.createElement("img");
            newImage.src = `photos/${video.title}_${video.goalTime}_${video.game}.png`;

            var newLink = document.createElement("a");
            newLink.href = `video/${video.title}_${video.goalTime}_${video.game}`;

            //create title element
            var newVideoTitle = document.createElement("h3");
            newVideoTitle.innerHTML = `<a href="video/${video.title}_${
              video.goalTime
            }_${video.game}">${video.title.replace(/-/g, " ")}</a>`;
            //localStorage.setItem(`${video.title}`, `${video.timePosted.replace(' ', '-').replace(' ', '-')}`)
            //create goal time element
            var newVideoGoalTime = document.createElement("p");
            newVideoGoalTime.innerHTML = `Goal Time: ${video.goalTime}`;
            //create game element
            var newVideoGame = document.createElement("p");
            newVideoGame.innerHTML = `Game: ${video.game}`;
            // create a time posted element
            var newVideoTime = document.createElement("p");
            newVideoTime.innerHTML = `Posted: ${video.timePosted}`;
            //create container element for the video card
            var newVideoCard = document.createElement("div");
            newVideoCard.classList.add("video-card");
            //append all elements to the video card
            newLink.appendChild(newImage);
            newVideoCard.appendChild(newLink);
            newVideoCard.appendChild(newVideoTitle);
            newVideoCard.appendChild(newVideoGoalTime);
            newVideoCard.appendChild(newVideoGame);
            newVideoCard.appendChild(newVideoTime);
            //append video card to the video container
            videoContainer.appendChild(newVideoCard);
          });

          var paginationContainer = document.getElementById("pagination");
          //create function to generate pagination links
          function generatePaginationLinks(pageNumber) {
            paginationContainer.innerHTML = "";
            //calculate the number of pages
            let numberOfPages;
            try {
              numberOfPages = Math.ceil(data[0].datalength / videosPerPage);
            } catch (err) {
              numberOfPages = Math.ceil(0 / videosPerPage);
            }
            let previousLink = document.createElement("a");
            previousLink.innerHTML = "Previous";
            previousLink.addEventListener("click", function () {
              if (currentPage > 1) {
                currentPage--;
                getVideos(currentPage);
                // add the condition here
                let paginationLinks =
                  paginationContainer.getElementsByTagName("a");
                for (let i = 0; i < paginationLinks.length; i++) {
                  if (paginationLinks[i].innerHTML == currentPage) {
                    paginationLinks[i].style.background = "lightblue";
                  } else {
                    paginationLinks[i].style.background = "";
                  }
                }
              }
            });
            paginationContainer.appendChild(previousLink);

            let start = 1;
            let end = numberOfPages;
            const maxDisplayed = 7; // Number of page links to display

            if (numberOfPages > maxDisplayed) {
              if (currentPage <= Math.floor(maxDisplayed / 2)) {
                start = 1;
                end = maxDisplayed;
              } else if (
                currentPage >=
                numberOfPages - Math.floor(maxDisplayed / 2)
              ) {
                start = numberOfPages - maxDisplayed + 1;
                end = numberOfPages;
              } else {
                start = currentPage - Math.floor(maxDisplayed / 2);
                end = currentPage + Math.floor(maxDisplayed / 2);
              }
            }

            //loop through the number of pages
            for (let i = start; i <= end; i++) {
              let paginationLink = document.createElement("a");
              paginationLink.innerHTML = i;
              if (currentPage === i) {
                paginationLink.style.background = "lightblue";
              }
              paginationLink.addEventListener("click", function () {
                currentPage = i;
                getVideos(currentPage);
                generatePaginationLinks(i);
              });
              paginationContainer.appendChild(paginationLink);
            }

            let nextLink = document.createElement("a");
            nextLink.innerHTML = "Next";
            nextLink.addEventListener("click", function () {
              if (currentPage < numberOfPages) {
                currentPage++;
                getVideos(currentPage);
                // add the condition here
                let paginationLinks =
                  paginationContainer.getElementsByTagName("a");
                for (let i = 0; i < paginationLinks.length; i++) {
                  if (paginationLinks[i].innerHTML == currentPage) {
                    paginationLinks[i].style.background = "lightblue";
                  } else {
                    paginationLinks[i].style.background = "";
                  }
                }
              }
            });
            paginationContainer.appendChild(nextLink);
          }

          //call the function to generate the pagination links
          generatePaginationLinks(currentPage);
        });
    }

    //call the function to get the first page videos
    getVideos(currentPage);
    // Get the pagination container element

    //});

    let searchResultText = document.querySelector(".search-result");
    if (searchResultText) {
      searchResultText.remove();
    }
    let searchResult = document.createElement("p");
    searchResult.innerHTML = "Search result for " + `'${searchTerm}'`;
    searchResult.classList.add("search-result"); // add class to the searchResult
    // append the searchResult element after the search button
    searchButton.appendChild(searchResult);
  }
});
