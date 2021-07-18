import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  cardList: any[] = [
    {
      name: 'Juanito',
      cardNumber: '123456789',
      expirationDate: '01/24',
      cvv: '321'
    }, {
      name: 'Juanita',
      cardNumber: '123456781',
      expirationDate: '11/24',
      cvv: '123'
    }
  ];

  createCard() {
    const card: any = {
      name: this.form.get('name')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value
    }
    this.cardList.push(card);
    this.form.reset();
    this.toastr.success('Card Registered', 'Success');
  }

  deleteCard(index: number) {
    this.cardList.splice(index, 1);
    this.toastr.error('Card Deleted', 'Success');
  }

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      ccv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });

  }

  ngOnInit(): void {
  }

}
