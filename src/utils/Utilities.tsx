import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export const formartMoney = (val: any) => {
  return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ';
};

// export const validateEmail = (val: any) => {
//   return val
//     .toString()
//     .replace(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
// };

export function checkMail(email: any) {
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(email)) {
    return true;
  }
  return false;
}

export function isVietnamesePhoneNumber(number: number | any) {
  return /((^(\+84|84|0){1})(3|5|7|8|9))+([0-9]{8})$/.test(number);
}

export const makeId = (length: number) => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomNumberBetween = (min: any, max: any) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomQuestionFromArray = (array: any) => {
  const randomIndex = getRandomNumberBetween(0, array.length - 1);
  return array[randomIndex];
};

export const getRandomQuestionsArray = (num: any, data: any) => {
  const finalQuestionArray: any = [];

  while (finalQuestionArray.length < num) {
    const val = getRandomQuestionFromArray(data);

    if (!finalQuestionArray.find((q: any) => q._id === val._id)) {
      finalQuestionArray.push(val);
    }
  }
  return finalQuestionArray;
};

export function useSwipe(
  onSwipeLeft?: any,
  onSwipeRight?: any,
  rangeOffset = 4,
) {
  let firstTouch = 0;

  // set user touch start position
  function onTouchStart(e: any) {
    firstTouch = e.nativeEvent.pageX;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  }
}
export function isNullEmptyBlank(str: string | any) {
  return str.indexOf(' ') >= 0 ? true : false;
}
