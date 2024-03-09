
function percent_format(raw_val, num_digits){
  return str(round(raw_val, num_digits)*100).slice(0, 2)+"%"
  // round on its own wasn't working 
}

function stacked_bar(truism, y_loc){
  let bar_length = rwidth/7;
  let bar_width = 10
  
  let agree = truism.agree_percent;
  let neutral = truism.neutral_percent;
  let disagree = truism.disagree_percent;
  
  let x_loc = 8.5*rwidth/18;
  push();
  noStroke();
  fill(green);
  rect(x_loc-5, y_loc, bar_length*agree, bar_width);
  fill(yellow);
  rect(x_loc+0.9*bar_length, y_loc, bar_length*neutral, bar_width);
  fill(red);
  rect(x_loc+1.6*bar_length, y_loc, bar_length*disagree, bar_width);
  fill(purple);
  rect(x_loc+2.4*bar_length, y_loc, bar_length*truism.controversial, bar_width);
  pop();
  
  push();
  textAlign(LEFT);
  textFont(medium_font);
  textSize(11);
  text("Resonates with Me", x_loc-5, rheight/42);
  text("No Opinion", x_loc+0.9*bar_length, rheight/42);
  text("Does Not Resonate", x_loc+1.6*bar_length, rheight/42);
  text("Controversiality", x_loc+2.4*bar_length, rheight/42);
  textAlign(RIGHT);
  text("Click Headings to Sort",7*rwidth/16, rheight/42); 
  pop()

}

function stacked_bar_spaced(truism, y_loc){
  let bar_length = rwidth/7; // same as stacked_bar()
  let short_bar=0.85*bar_length;
  let bar_width = 10
  
  let agree = truism.agree_percent;
  let neutral = truism.neutral_percent;
  let disagree = truism.disagree_percent;
  let controversial = truism.controversial;
  
  let x_loc = 8.5*rwidth/18;
  push();
  noStroke();
  fill(green_hl);
  rect(x_loc-5, y_loc, short_bar*agree, bar_width);
  fill(yellow_hl);
  rect(x_loc+0.9*bar_length, y_loc, short_bar*neutral, bar_width);
  fill(red_hl);
  rect(x_loc+1.6*bar_length, y_loc, short_bar*disagree, bar_width);
  fill(purple_hl);
  rect(x_loc+2.4*bar_length, y_loc, short_bar*controversial, bar_width);
  pop()
  
  push();
  noStroke();
  textSize(8);
  fill(50);
  text(percent_format(agree, 2), x_loc-5+short_bar*agree+20, y_loc+ 0.5*rheight/34);
  text(percent_format(neutral, 2),x_loc+0.9*bar_length+short_bar*neutral+20, y_loc+0.5*rheight/34);
  text(percent_format(disagree, 2), x_loc+1.6*bar_length+short_bar*disagree+20, y_loc+ 0.5*rheight/34);
  text(round(controversial, 2), x_loc+2.4*bar_length+short_bar*controversial+20, y_loc+ 0.5*rheight/34)
  pop();
}
