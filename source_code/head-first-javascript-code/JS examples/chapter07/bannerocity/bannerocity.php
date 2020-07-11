<html>
  <body>
    <?php
      $num = rand(1000, 10000);
      $message = $_POST['message'];
      $zipcode = $_POST['zipcode'];
      $date = $_POST['date'];
      $name = $_POST['name'];
      $phone = $_POST['phone'];
      $email = $_POST['email'];

      echo "<h1>Bannerocity</h1>";
      echo "<h2>Order Confirmation</h2>";
      echo "<strong>Order #" . $num . "</strong><br />";
      echo "Banner message: <span style='font-family:monospace; font-size:x-large'><strong>" . $message . "</strong></span><br />";
      echo "ZIP code: " . $zipcode . "<br />";
      echo "Fly date: " . $date . "<br />";
      echo "Customer name: " . $name . "<br />";
      echo "Phone number: " . $phone . "<br />";
      echo "Email: " . $email . "<br />";
    ?>
  </body>
</html>
