// https://client.fathom.info/mit/230325/FilmPoll/FilmPoll.js
let dataTable;
let semibold_font, bold_italic_font, medium_font;
const CATEGORIES = ["agree_percent", 'neutral_percent', "agree_percent", "controversial"];

// Colours
let red = "#c53f2a"; // "#D0291A"
let red_hl = "#e48e80"; // red highlight 
let green = "#72c113"; // "#7FCD26"
let green_hl = "#abd873"; //"#9ace5a";
let yellow =  "#FBC84C"; //"#fab100"; // "#8D8D7F";
let yellow_hl = "#fce099";
let purple = "#9673c7"; //"#c45cce";
let purple_hl = "#c8b4e6";
 
let single_truism = 0;
let show_all_truisms = false;
let show_intro = true;

let truismList = [ ];
let sortOrder;
let scale_bar = new SoftNum(0, 0.1, 0.5); // making the single_truism_stat bars grow

function preload() {
  table = loadTable("truism_summary.csv", "header");
  semibold_font = loadFont("data/Jost-SemiBold.ttf");
  bold_italic_font = loadFont("data/Jost-BoldItalic.ttf");
  medium_font = loadFont("data/Jost-Medium.ttf"); 
}

function setup() {
  windowRatio(960, 500);
  num_row = table.getRowCount();
  num_col = table.getColumnCount();
  
  table.rows.forEach((row, index) => {
    let t = new Truism(index, 
                       row.getString("truism"), 
                       row.getNum("disagree"), 
                       row.getNum("neutral"), 
                       row.getNum("agree"),
                       row.getString("category"));
    truismList.push(t);
  });
  
  sortOrder = new Array(truismList.length);
  for (let i = 0; i < truismList.length; i++) {
    sortOrder[i] = i;
  }
}


function draw() {
  updateRatio();
  background("#fcf5ee");

  buttons(show_all_truisms);
  
  if (!show_all_truisms){
    if (show_intro){
      introduction();
    } else {
      scale_bar.setTarget(1); 
      scale_bar.update();
      truism = truismList[single_truism]; // single_truism is based on number of variables 
      single_truism_stats(truism, scale_bar.get());
    }
  } else {
    all_truisms();
  }
}

function mouseClicked(){
  let y_switch = rheight/34;
  let x_switch = rwidth/20;
  let button_spacing = rheight/40;
  if (rmouseX>x_switch/2 && rmouseX<(x_switch/2+1.5*x_switch) && rmouseY>(y_switch-20) && rmouseY<(y_switch-20+1.5*y_switch)){
    show_all_truisms = !show_all_truisms;
  } 
  
  if (show_intro){ // looping through individual truisms
    show_intro=false;
  } else if (single_truism<31 && !show_intro){ 
    show_intro = false;
    single_truism += 1;
  } else if (single_truism==31 && !show_all_truisms){
    show_intro = true;
    single_truism = 0;
  }
  
  let x = rwidth/18; // grid locations for buttons 
  let y = rheight/50;
  let bar_length = rwidth/7; 
  if (show_all_truisms){ // Sorting Order buttons 
    if (rmouseY>0 && rmouseY<2*y){
      if (rmouseX>8.5*x-5 && rmouseX<10.5*x){
          setOrder("agree");
        } else if (rmouseX>8.5*x+0.9*bar_length && rmouseX<8.5*x+1.5*bar_length) {
          setOrder("neutral");
        } else if (rmouseX>8.5*x+1.6*bar_length && rmouseX<8.5*x+2.3*bar_length) {
          setOrder("disagree");
        } else if (rmouseX>8.5*x+2.4*bar_length && rmouseX<8.5*x+3.3*bar_length){
          setOrder("controversial");
        }
    }
  } 
  scale_bar.set(0); // resetting single_truism_stat scaling to 0 so it grows each time 
}

function keyPressed() {
  if (show_intro){
    show_intro=false;
    if (keyCode===RIGHT_ARROW){
      single_truism=0;
    } else if (keyCode===LEFT_ARROW){
      single_truism=31;
    }
  } else {
    if (keyCode===RIGHT_ARROW && single_truism==31) {
      show_intro=true;
      single_truism=0;
    } else if (keyCode===LEFT_ARROW && single_truism==0) {
      show_intro=true;
      single_truism=0;
    } else if (keyCode===RIGHT_ARROW) {
      single_truism += 1;
    } else if (keyCode===LEFT_ARROW) {
      single_truism -= 1;
    }
  }
  scale_bar.set(0); 
}
