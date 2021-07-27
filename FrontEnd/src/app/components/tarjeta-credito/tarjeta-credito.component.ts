import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  cardList: any[] = [];
  action = 'Create';
  id: number | undefined;

  createCard() {
    const card: any = {
      name: this.form.get('name')?.value,
      cardNumber: this.form.get('cardNumber')?.value,
      expirationDate: this.form.get('expirationDate')?.value,
      cvv: this.form.get('cvv')?.value
    }
    if (this.id == undefined) {
      this._cardService.createCard(card).subscribe(data => {
        this.form.reset();
        this.getCards();
        this.toastr.success('Card Registered', 'Success');
      }, error => {
        console.log(error);
      });
    } else {
      card.id = this.id;
      this._cardService.updateCard(card.id, card).subscribe(data => {
        this.form.reset();
        this.action = "Create";
        this.id = undefined;
        this.toastr.info('Card Updated', 'Card Updated Success')
        this.getCards();
      }, error => {
        console.log(error);
      });
    }
  }

  deleteCard(id: number) {
    this._cardService.deleteCard(id).subscribe(data => {
      this.toastr.error('Card Deleted', 'Success');
      this.getCards();
    }, error => {
      console.log(error);
    });
  }

  form: FormGroup;

  getCards() {
    this._cardService.getCardList().subscribe(data => {
      console.log(data);
      this.cardList = data;
    }, error => {
      console.log(error);
    });
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _cardService: CardService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });

  }

  ngOnInit(): void {
    this.getCards();
  }

  updateCard(card: any) {
    this.action = "Edit";
    this.id = card.id;

    this.form.patchValue({
      name: card.name,
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvv: card.cvv
    });
  }
}
