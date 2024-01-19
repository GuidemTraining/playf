<button id="showToast" class="btn btn-primary">Show Toast</button>

<script>
  document.getElementById('showToast').addEventListener('click', function() {
    var toastElement = document.querySelector('.toast');
    var toast = new bootstrap.Toast(toastElement);
    toast.show();
  });
</script>
