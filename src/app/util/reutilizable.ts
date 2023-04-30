export function formulariosInvalido(form: any, el: any) {
  for (const key of Object.keys(form.controls)) {
    if (form.controls[key].invalid) {
      const invalidControl = el.nativeElement.querySelector('[formControlName="' + key + '"]');
      invalidControl.focus(); break;
    }
    form.markAllAsTouched();
  }
}
