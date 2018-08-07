import {  Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  public Bio: string;

  constructor() {
    this.Bio=`Thomas Back studied at Northern Arizona University, majoring in Applied Computer Science with a minor in Japanese.
    Along with Japanese, programming has become a beloved language of Thomas’s after discovering its satisfying balance of creativity, challenge, and vast problem solving applications. This lead Thomas to the major, an internship at a Campbell, CA based database company, TrifoxInc, as well as to participate in Computer Science enthusiast inspired events such as the UCLA hosted hackathon, “LA Hacks” of 2014.

    Web development has become a passionate pursuit both as challenge and hobby for Thomas, leading his senior capstone project as the front-end lead for a cross platform React-Native mobile application. Additional side projects include a shopping site for his friend's clothing brand and products, Spiff Passe, built in AngularJS, and backed by MongoDB and Firebase. Other web technologies proficient to Thomas are Bootstrap, Meteor, PHP, MySQL, and of course Javascript. `;
  }
}
