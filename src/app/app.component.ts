import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Device, DeviceInfo } from '@capacitor/device';
import { IonicModule } from '@ionic/angular';
import { Sim, SimCard } from '@jonz94/capacitor-sim';
import { from, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, JsonPipe],
})
export class AppComponent {
  protected simCards: SimCard[] | null = null;

  protected basicDeviceInformation$ = from(Device.getInfo()).pipe(
    map(
      ({ platform, osVersion, manufacturer, model }) =>
        ({ platform, osVersion, manufacturer, model } satisfies Partial<DeviceInfo>),
    ),
  );

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
