function formatNumber(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + 'K';
    } else if (number < 1000000000) {
      return (number / 1000000).toFixed(1) + 'JT';
    } else {
      return (number / 1000000000).toFixed(1) + 'M';
    }
  }