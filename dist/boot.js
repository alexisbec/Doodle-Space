window.onload=function(){const e={type:Phaser.AUTO,width:800,height:480,backgroundColor:"black",physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},scene:[Title,Game,GameOver],pixelArt:!0,roundPixels:!0};new Phaser.Game(e)};