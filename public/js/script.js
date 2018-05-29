document.addEventListener("click", function(e){
    if(e.target.className == "delete"){
        console.log("delete 1")
        console.log(`/${e.target.dataset.type}/${e.target.id}`)

        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `/${e.target.dataset.type}/${e.target.id}`, true);
        xhr.send();
        xhr.onreadystatechange = function() { 
          if (xhr.readyState != 4) return;
          if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
            location.href = "/planets"
          } else {
            console.log("GO!");
            console.log(xhr.status + ': ' + xhr.statusText);
            location.href = "/planets"
          }
        }
    }
  });
