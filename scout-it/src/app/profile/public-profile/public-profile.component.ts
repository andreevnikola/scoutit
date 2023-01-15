import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCity, faEnvelope, faLocationDot, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileService } from '../profile.service';
import * as L from 'leaflet';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements AfterViewInit{
  profileNotFound: boolean = false;
  mailIcon = faEnvelope;
  countryPin = faLocationDot;
  addressPin = faMapPin;
  cityIcon = faCity;
  editing: boolean = false;
  geocoords: BehaviorSubject<number[]> = new BehaviorSubject([0]);
  id: Observable<string> | undefined;

  username: string = "";
  profile_picture: string = "";
  fullname: string = "";
  mail: string = "";
  phone: string = "";
  country: string = "";
  address: string = "";
  city: string = "";
  description: string = "";
  loading: boolean = true;
  yourAcc: boolean = false;

  @ViewChild('form') form!: NgForm;

  private map: any;
  private initMap(): void {
    this.geocoords.subscribe({
      next: (data) => {
        if(data.length < 2 || !this.address || !this.country || !this.city){ return; }
        this.map = L.map('map', {
          center: data as any,
          zoom: 13
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 4,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);

        const userProfilePictureIcon = L.icon({
          iconUrl: '/assets/images/pin.png',
      
          iconSize: [30, 40], // size of the icon
          iconAnchor: [15, 35]
        });
        const marker = new L.Marker(data as any, {icon: userProfilePictureIcon});
        marker.addTo(this.map);
      }
    });
  }

  constructor( private route: ActivatedRoute, private profileService: ProfileService, private httpClient: HttpClient ){
    this.id = new Observable(observer => {
      this.route.paramMap.subscribe( paramMap => {
        observer.next(paramMap.get('id')!);
      })
    });
    this.id.subscribe((id: string) => {
      this.profileService.getProfile(id).subscribe({
        next: (data) => {
          if(!data){
            this.profileNotFound = true;
            return;
          }
          this.username = data.username!;
          this.fullname = data.fullname!;
          this.mail = data.mail!;
          this.phone = data.phone!;
          this.profile_picture = data.profile_picture!;
          this.loading = false;
          this.address = data.address || "";
          this.country = data.country || "";
          this.city = data.city || "";
          this.description = data.description || "";
          if(data.username! === sessionStorage.getItem("username")){ this.yourAcc = true; }
          this.getGeocoordsByAddress();
        },
        error: (err) => {
          alert("Something went wrong!")
        }
      });
    });
  }

  getGeocoordsByAddress(){
    this.httpClient.get<any>(`http://dev.virtualearth.net/REST/v1/Locations?countryRegion=${this.country}&locality=${this.city}&addressLine=${this.address}&includeNeighborhood=1&maxResults=1&key=AhdwRrr6Vw7sNf-VhQTdtQ3J9_O4qxCOjW1PK5lEFpsW48FMozs07L58sw2q3VLG`).subscribe({
      next: async (data) => {
        let coords: number[] = data.resourceSets[0].resources[0].point.coordinates;
        this.geocoords.next(coords);
      }
    });
  }

  updatePublicProfileDataHandler(description: string, address: string, city: string, country: string){
    this.loading = true;
    this.profileService.updateProfile(description, address, city, country).subscribe({
      next: (data) => {
        this.loading = false;
        this.country = country;
        this.address = address;
        this.description = description;
        this.city = city;
        this.editing = false;
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 401){ return; }
        alert("Something went wrong!");
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
