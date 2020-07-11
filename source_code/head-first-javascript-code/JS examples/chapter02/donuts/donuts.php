<html>
  <body>
    <?php
      $num = rand(1000, 10000);
      $name = $_POST['name'];
      $minutes = $_POST['pickupminutes'];
      $total = $_POST['total'];

      echo "<h1>Duncan's Just-In-Time Donuts</h1>";
      echo "<h2>Order Confirmation</h2>";
      echo "<strong>Order #" . $num . "</strong><br />";
      echo "Customer name: " . $name . "<br />";
      echo "Ready in: " . $minutes . " minutes<br />";
      echo "Total: <em>" . $total . "</em>";
    ?>
  </body>
</html>
