import { AbstractControl, ValidatorFn } from '@angular/forms';

function getDateFormat(date: string): Date {
  if(!date) return new Date();
  const dateString = date.split('-');
  const day = dateString[2];
  const month = dateString[1];
  const year = dateString[0];
  return new Date(month + '-' + day + '-' + year);
}

export function formatToday(): Date {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  return new Date(month + '-' + day + '-' + year);
}

export function dateLessThan(from: string, to: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls?.get(from);
    const checkControl = controls?.get(to);

    if ( getDateFormat(control?.value) > getDateFormat(checkControl?.value)) {
      return { dateInvalid: true };
    } else {
      return null;
    }
  };

}

export function fromNowDate(control: AbstractControl){
  if (!control?.value) {
    return null;
  }
  const today = formatToday();
  const newDate = getDateFormat(control?.value);
  const isValid = newDate >= today;
  return isValid ? null : { 'date': 'This date is invalid' };
}


