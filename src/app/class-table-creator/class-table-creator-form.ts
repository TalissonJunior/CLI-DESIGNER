import { InputForm, CancelSaveButtonForm } from '../../models/class-table-form';

export class ClassTableCreatorForm {
  constructor() {}

  createInput(inputForm: InputForm): void {
    const formGroup = inputForm.form.append('div').attrs({
      class: 'class-table-form-group'
    });

    const label = formGroup.append('label');
    const input = formGroup.append('input');

    label.text(inputForm.label);
    input.attrs({
      type: 'text',
      value: inputForm.initialValue
    });

    input.on('input', function() {
      if (inputForm.onValueChange) {
        inputForm.onValueChange(this.value, this);
      }
    });
  }

  createCancelSaveButton(buttonsForm: CancelSaveButtonForm): void {
    const formGroup = buttonsForm.form.append('div').attrs({
      class: 'class-table-form-group-btn'
    });

    const btnCancel = formGroup.append('btn');
    const btnSave = formGroup.append('btn');

    btnCancel
      .attrs({
        type: 'button',
        class: 'btn btn-cancel ' + buttonsForm.cancelButtonClass || ''
      })
      .text(buttonsForm.cancelButtonLabel);

    btnSave
      .attrs({
        type: 'button',
        class: 'btn btn-save ' + buttonsForm.saveButtonClass || ''
      })
      .text(buttonsForm.saveButtonLabel);

    btnCancel.on('click', function() {
      buttonsForm.cancelButtonOnClick();
    });

    btnSave.on('click', function() {
      buttonsForm.saveButtonOnClick();
    });
  }
}
