import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Sim, SimCard } from '@jonz94/capacitor-sim';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, NgIf, JsonPipe],
})
export class AppComponent {
  protected simCards: SimCard[] = [];

  async getSimCards() {
    const { simCards } = await Sim.getSimCards();

    const sortedSimCards = simCards.map(
      ({ number, allowsVOIP, carrierName, isoCountryCode, mobileCountryCode, mobileNetworkCode }) => ({
        number,
        allowsVOIP,
        carrierName,
        isoCountryCode,
        mobileCountryCode,
        mobileNetworkCode,
      }),
    );

    this.simCards = sortedSimCards;
  }
}
