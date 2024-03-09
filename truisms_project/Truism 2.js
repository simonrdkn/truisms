function Truism(index, text, disagree, neutral, agree, category) {
  this.text = text;
  
  this.disagree = disagree;
  this.neutral = neutral;
  this.agree = agree;
  this.category = category;
  
  let count = disagree + neutral + agree;
  
  this.disagree_percent = disagree / count;
  this.neutral_percent = neutral / count;
  this.agree_percent = agree / count;
  this.controversial = (1-this.neutral_percent)*(1-abs(this.agree_percent-this.disagree_percent));
  
  this.position = new SoftNum(index);
  
  this.setPosition = function(index, category) {
    //print(`moving ${this.name} to ${index}`);
    this.order = index;
    this.position.setTarget(index);
  }
  
  this.updatePosition = function() {
    this.position.update();
  }
  
  this.getPosition = function() {
    //return floor(this.position.getTarget());
    return floor(this.position.get());
  }
  
  this.mouseInside = function() {
    let spacing = rheight / 36;
    let top = this.position.get() * spacing;
    return rmouseY > top && rmouseY < top + spacing;
  }
}

// category will be agree/disagree/neutral/controversial
function setOrder(category) {
  sortCategory = category;
  sortOrder.sort((a, b) => {
    let diff = truismList[b][sortCategory] - truismList[a][sortCategory];
    if (diff != 0) {
      return diff;
    }
    // use movie name as the tie-breaker so that sort order is stable
    return truismList[a].text.localeCompare(truismList[b].text);
  });
  sortOrder.forEach((which, position) => {
    truismList[which].setPosition(position, category);
  });
}
