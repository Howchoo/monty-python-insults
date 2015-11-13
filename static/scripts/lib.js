String.prototype.trunc = function(n){
   var isTooLong = this.length > n;
   var string = isTooLong ? this.substr(0,n) : this;
   string = isTooLong ? string.substr(0, string.lastIndexOf(' ')) : string;
   return  isTooLong ? string + '...' : string;
};
