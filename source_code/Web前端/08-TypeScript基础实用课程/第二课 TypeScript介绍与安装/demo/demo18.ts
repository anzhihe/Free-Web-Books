enum Direction{
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
console.log(Direction.Up);
console.log(Direction["UP"]);

enum Shape{
    Round,
    Rectangle,
    Diamond,
    Pentagon
}
let r = Shape.Round;
console.log(Shape[0]);
console.log(Shape[r]);