function all_truisms(){
  let spacing = rheight/34; // 32 statements 

  truismList.forEach(truism => {
    truism.updatePosition();  // take next step for motion
    
    let y_text = truism.getPosition()*spacing + 2*spacing; 
    textAlign(RIGHT);
    textFont(bold_italic_font);
    textSize(10);
    text(truism.text, 7*rwidth/16, y_text);
    
    let y = truism.getPosition()*spacing+1.5*spacing;
    let top_row = truism.getPosition()*spacing + 1.5*spacing;
    let bottom_row = (truism.getPosition()+1)*spacing + 1.5*spacing;
    
    if (rmouseY > top_row && rmouseY < bottom_row){ 
      stacked_bar_spaced(truism, y);
      push(); 
      fill(120); // same text but lighter)
      text(truism.text, 7*rwidth/16, y_text);
      pop();
    }
    else{
      stacked_bar(truism, y); 
    }
  });
}



function single_truism_stats(truism, softnum_scale){
  
  let bar_length = rheight/3*softnum_scale;
  let bar_width = rwidth/12;
  let x_loc = rwidth/4; // starting point of x axis
  let y_loc = 6*rheight/7; // lower margin of y axis
  let radius = 0.7*rwidth/8; 

  let agree = truism.agree_percent;
  let neutral = truism.neutral_percent;
  let disagree = truism.disagree_percent;
  let controversial = truism.controversial*softnum_scale;
  let controversial_angle = map(controversial, 0, 1, PI, 0);
  
  let h_space = rwidth/2; // Settings for Large Truism Text
  let v_space = rheight/4;
  let font_size, wrap_width;
  if (textWidth(truism.text) > 370){
    font_size = 48;
    wrap_width = 3.3*rwidth/4;
  } else if (textWidth(truism.text) > 320){
    font_size = 50;
    wrap_width = 3*rwidth/4;
  } else {
    font_size = 55;
    wrap_width = 3*rwidth/4;
  }
  
  push(); // Large Truism Text
  textFont(bold_italic_font);
  fill(50);
  textSize(font_size);
  textAlign(CENTER);
  rectMode(CENTER); // text box location is based on rect mode
  textWrap(WORD); 
  text(truism.text, h_space, v_space, wrap_width);
  pop();
  
  push(); // Percentage bars
  noStroke();
  fill(green);
  rect(x_loc, y_loc-bar_length*agree, bar_width, bar_length*agree);
  fill(yellow);
  rect(x_loc+bar_width, y_loc-bar_length*neutral, bar_width, bar_length*neutral);
  fill(red);
  rect(x_loc+2*bar_width, y_loc-bar_length*disagree, bar_width, bar_length*disagree);
  pop();
  
  push(); // Making the guage
  noFill();
  strokeWeight(8);
  strokeCap(SQUARE);
  stroke("#643d9a"); // dark purple
  arc(x_loc+4.7*bar_width, y_loc, radius*2, radius*2, PI, 0);
  pop();
  
  push(); // Amount filled out
  noStroke();
  fill(purple);
  arc(x_loc+4.7*bar_width, y_loc, radius*1.92, radius*1.92, PI,  -controversial_angle);
  pop();  
  
  push(); // Labels
  noStroke();
  textSize(15);
  fill(70); 
  textFont(semibold_font);
  textAlign(CENTER);
  rectMode(CENTER);
  
  text(percent_format(agree, 2), x_loc+bar_width/2, y_loc - bar_length*agree-10); // Percentage labels 
  text(percent_format(neutral, 2), x_loc+bar_width+bar_width/2, y_loc - bar_length*neutral-10);
  text(percent_format(disagree, 2), x_loc+2*bar_width+bar_width/2, y_loc-bar_length*disagree-10);
  text(round(controversial, 2), x_loc+4.7*bar_width, y_loc-1.15*radius);
  
  let wrap_len = bar_width-10; // Lower Label text
  let text_label_y = y_loc+15;
  textSize(12);
  textWrap(WORD);
  text("Resonates With Me", x_loc+bar_width/2, text_label_y, wrap_len);
  text("No Opinion", x_loc+bar_width+bar_width/2, text_label_y, wrap_len);
  text("Does Not Resonate", x_loc+2*bar_width+bar_width/2, text_label_y, wrap_len);
  text("Controversiality", x_loc+4.7*bar_width, text_label_y + 5);
  pop();
}

function introduction(){
  let h_space = rwidth/2; 
  let v_space = rheight/4; 
  
  push(); // TITLE
  textFont(bold_italic_font);
  fill(50);
  textSize(55);
  textAlign(CENTER);
  rectMode(CENTER); // text box location is based on rect mode
  text("A LITTLE KNOWLEDGE", h_space, v_space);
  
  textSize(25);
  textWrap(WORD);
  text("Jenny Holzer is a conceptual artist known for her Truisms, which is a series of provocative one-liners. For this project, 105 MIT students rated 32 truisms as 'Resonates with Me', 'No Opinion', or 'Does Not Resonate'. \n\n Navigate with the left & right arrow keys.",
    h_space, 1.5*v_space, 3*rwidth/4);
  pop();
}

function buttons(show_all_truisms){
  let y_grid = rheight/34;
  let x_grid = rwidth/20;
  let button_spacing = rheight/40;
  
  push();
  noStroke();
  fill(70);
  rect(x_grid/2, y_grid-20, 1.5*x_grid, 1.5*y_grid);
  pop();
  
  push();
  textFont(semibold_font);
  textSize(13);
  fill(250);
  rectMode(CENTER);
  textAlign(CENTER);
  if (show_all_truisms){
    text("Back", 1.22*x_grid, 0.7*y_grid)
  } else {
    text("See All", 1.22*x_grid, 0.7*y_grid)
  }
  pop();
}
