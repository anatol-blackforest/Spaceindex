window.onload = function(){

  const upload = document.getElementById("upload");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const type = document.getElementById("type");
  const parentPlanet = document.getElementById("parentPlanet");

  let enabled_post = true;

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

  upload.addEventListener("submit", function(e){
    e.preventDefault();
    if(title.value && description.value){
      if(enabled_post){
        if(type.value == "moon"){
          if(parentPlanet.value.trim()){
            upload.submit();
            enabled_post = false;
          }else{
            alert("Введите материнскую планету!");
          }
        }else{
          upload.submit();
          enabled_post = false;
        }
      }
    }else{
      alert("Введите название и описание!");
    }
  });

}