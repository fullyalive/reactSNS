let nepal = {
  mountains: ["Everest", "Fish Tail", "Annapurna"],
  printWithDash: function() {
    setTimeout(() => console.log(this.mountains.join(" - ")), 3000);
  }
};

// alert(nepal.mountains);
nepal.printWithDash();
