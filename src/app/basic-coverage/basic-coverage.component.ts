import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-coverage',
  templateUrl: './basic-coverage.component.html',
  styleUrls: ['./basic-coverage.component.css']
})
export class BasicCoverageComponent implements OnInit {

  isShow = false;
  masterData: any;
  basic_addons = [
    {
      addon_name: 'Fire',
      description_text: 'Fires hazards are common. So is our claim payout in case of one',
      isVisible: false,
      img: 'fire.png'
    },
    {
      addon_name: 'Flood/Inundation',
      description_text: 'When rains or other calamities cause damage by flooding, we cover your repairs',
      isVisible: false,
      img: 'disaster.png'
    },
    {
      addon_name: 'Lightning',
      description_text: 'lightning,Bush fire all are scary but don’t worry . You"re covered for all of them',
      isVisible: false,
      img: 'lightening.png'
    },
    {
      addon_name: 'Water ',
      description_text: 'Cyclone Amphan or Nisarga - We have you covered',
      isVisible: false,
      img: 'typhoon.png'
    },
    {
      addon_name: 'Riot/Strike/Malicious Damage',
      description_text: 'We hope there are no more strikes or riots. Just in case, we cover you',
      isVisible: false,
      img: 'riot.png'
    },
    {
      addon_name: 'Earthquake',
      description_text: 'Almost 54% of Indian landmass is prone to earthquakes. We cover you for 100%',
      isVisible: false,
      img: 'ground.png'
    },
    {
      addon_name: 'Storm/Cyclone',
      description_text: 'Cyclone Amphan or Nisarga - We have you covered',
      isVisible: false,
      img: 'hurricane.png'
    },
    {
      addon_name: 'Terrorism',
      description_text: 'Cyclone Amphan or Nisarga - We have you covered',
      isVisible: false,
      img: 'terrorist.png'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.masterData = JSON.parse((sessionStorage.getItem('master_data')));
    // this.basic_addons = this.masterData.BasicCvrDetails;
    // this.basic_addons.forEach( addon => {
    //   let masterD = this.checkMasterData(addon);
    //   if (masterD) {
    //     addon.isVisible = true;
    //     addon.description_text = masterD.ToolTip;
    //   }
    // });
  }
  checkMasterData(content) {
    return this.masterData.BasicCvrDetails.find((item: any) => item.Name === content.addon_name);
  }

  toggle() {
    this.isShow = !this.isShow;
  }

}
