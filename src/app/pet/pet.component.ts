import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pet, PetStore, Status } from '../generated-code/pet-store.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit, OnDestroy {
  columns: string[] = ['name', 'status'];
  columnsToDisplay = this.columns.slice();
  pets$: Observable<Pet[]>;
  pets: Pet[];
  petSubscription: Subscription;
  constructor(private readonly store: PetStore) {
    this.pets$ = undefined;
    this.pets = [];
    this.petSubscription = undefined;
  }

  ngOnInit(): void {
    this.getPets();
  }

  private getPets(): void {
    this.pets$ = this.store.findPetsByStatus([Status.Available]);
    this.petSubscription = this.pets$.subscribe(response => {
        if (!!response && response.length > 0) {
          this.pets = response.filter(pet => pet.name && pet.name.length > 6);
        }
    });
  }

  ngOnDestroy(): void {
    this.petSubscription.unsubscribe();
  }

  getPetsUsingPromise(): void {
    this.fetchPetsByStatus().then(response => {
      console.log(response);
    })
    .catch( error => {
      console.log(error);
    });
  }

  fetchPetsByStatus(): Promise<Response> {
    return fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
  }
}
