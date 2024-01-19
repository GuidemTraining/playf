const inject_html = function () {
  console.log("injecting html");

  // Create a Bootstrap modal
  var html = `
    <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Your modal content goes here.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the modal HTML to the body
  $("body").append(html);

  // Initialize the Bootstrap modal
  var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    backdrop: 'static', // Set the backdrop behavior as needed
  });

  // Show the modal
  myModal.show();
}

const inject_pops_css = function () {
  var f = document.getElementsByTagName("script")[0];
  j3 = document.createElement("link");
  j3.rel = "stylesheet";
  j3.href = "https://cdn.jsdelivr.net/gh/robgalvinco/playeah-pops@latest/css/playeah-pops.css";
  f.parentNode.insertBefore(j3, f);
}

Array.prototype.contains = function (needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
