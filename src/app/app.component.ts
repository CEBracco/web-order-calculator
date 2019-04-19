import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as ScrollMagic from 'ScrollMagic';
import 'ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  showLogo = false;
  darkItems = false;
  
  ngAfterViewInit(): void {
    // get all slides
    var slides = document.querySelectorAll("section");
    this.setSlidesEffect(slides);
    this.setOnShowFunction(slides);
  }

  setSlidesEffect(slides:any) {
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
    });

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
        .setPin(slides[i])
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    }
    return controller;
  }

  setOnShowFunction(slides:any){
    var appController = this;
    var controller = new ScrollMagic.Controller();

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i],
        offset: '400%',
        duration: '120%'
      })
        .on('enter', function (event) {
          appController.setSectionIcons(event.target.triggerElement().id);
        })
        //.addIndicators()
        .addTo(controller);
    }
    return controller;
  }

  setSectionIcons(id: String) {
    // TODO: use component vars to configure icons
    let sectionIconsConfig = [
      { id: 'home', showLogo:false, darkItems: false },
      { id: 'events', showLogo: true, darkItems: true },
      { id: 'marketing', showLogo: true, darkItems: false },
      { id: 'sessions', showLogo: true, darkItems: true }
    ];
    let config = sectionIconsConfig.find(config => config.id == id);
    this.showLogo = config.showLogo
    this.darkItems = config.darkItems;
  }
}
