import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBatteryFull, faBatteryHalf, faBuilding, faCity, faEnvelope, faHeart, faHourglassHalf, faHouse, faHouseLaptop, faLocationDot, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileService } from '../profile.service';
import * as L from 'leaflet';
import { NgForm } from '@angular/forms';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
})
export class PublicProfileComponent implements AfterViewInit {
  profileNotFound: boolean = false;
  mailIcon = faEnvelope;
  countryPin = faLocationDot;
  addressPin = faMapPin;
  cityIcon = faCity;
  likeIcon = faHeartRegular;
  likedIcon = faHeart;
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  linkedInIcon = faLinkedin;
  gitHubIcon = faGithub;
  houseIcon = faHouse;
  atOfficeIcon = faBuilding;
  houseLaptopIcon = faHouseLaptop;
  halfClockIcon = faBatteryHalf;
  fullClockIcon = faBatteryFull;
  editing: boolean = false;
  editing_links: boolean = false;
  geocoords: BehaviorSubject<number[]> = new BehaviorSubject([0]);
  id: Observable<string> | undefined;
  _id: string = '';

  username: string = "";
  profile_picture: string = "";
  fullname: string = "";
  mail: string = "";
  phone: string = "";
  country: string = "";
  address: string = "";
  city: string = "";
  facebook: string = "";
  instagram: string = "";
  twitter: string = "";
  linkedIn: string = "";
  gitHub: string = "";
  leetCode: string = "";
  description: string = "";
  loading: boolean = true;
  yourAcc: boolean = false;
  verified: boolean = false;
  liked: boolean = false;
  githubProfileName: string | undefined = "";
  leetCodeProfileName: string | undefined = "";
  workTypes: { freelance: boolean, halfDay: boolean, fullDay: boolean } = {
    freelance: false,
    halfDay: false,
    fullDay: false
  };
  workPlace: { home: boolean, office: boolean } = {
    home: false,
    office: false
  };
  // ghProfileData: any;
  likersCount: number = 0;

  your_username: string | null = sessionStorage.getItem('username');

  @ViewChild('form') form!: NgForm;

  private map: any;
  private initMap(): void {
    this.geocoords.subscribe({
      next: (data) => {
        if (
          data.length < 2 ||
          !this.address ||
          !this.country ||
          !this.city
        ) {
          return;
        }
        this.map = L.map('map', {
          center: data as any,
          zoom: 13,
        });
        const tiles = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            minZoom: 4,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        );
        tiles.addTo(this.map);

        const userProfilePictureIcon = L.icon({
          iconUrl: '/assets/images/pin.png',

          iconSize: [30, 40], // size of the icon
          iconAnchor: [15, 35],
        });
        const marker = new L.Marker(data as any, {
          icon: userProfilePictureIcon,
        });
        marker.addTo(this.map);
      },
    });
  }

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private httpClient: HttpClient
  ) {
    this.id = new Observable((observer) => {
      this.route.paramMap.subscribe((paramMap) => {
        observer.next(paramMap.get('id')!);
      });
    });
    this.id.subscribe((id: string) => {
      this._id = id;
      this.profileService.getProfile(id).subscribe({
        next: (data) => {
          this.loading = false;
          if (!data) {
            this.profileNotFound = true;
            return;
          }
          if (data.username! === sessionStorage.getItem('username')) {
            this.yourAcc = true;
          }
          this.verified = data.verified! || false;
          if (!this.verified && !this.yourAcc) {
            this.profileNotFound = true;
            return;
          }
          this.username = data.username!;
          this.fullname = data.fullname!;
          this.mail = data.mail!;
          this.phone = data.phone!;
          this.profile_picture = data.profile_picture!;
          this.address = data.address || "";
          this.country = data.country || "";
          this.city = data.city || "";
          this.description = data.description || "";
          this.facebook = data.facebook || "";
          this.instagram = data.instagram || "";
          this.twitter = data.twitter || "";
          this.linkedIn = data.linkedin || "";
          this.gitHub = data.github || "";
          this.leetCode = data.leetcode || "";
          this.leetCodeProfileName = this.leetCode.endsWith("/") ?
          this.leetCode.split("/")[this.leetCode.split("/").length - 2] || undefined : 
          this.leetCode.split("/")[this.leetCode.split("/").length - 1] || undefined
          this.githubProfileName = this.gitHub.endsWith("/") ?
          this.gitHub.split("/")[this.gitHub.split("/").length - 2] || undefined : 
          this.gitHub.split("/")[this.gitHub.split("/").length - 1] || undefined;
          this.liked = data.followers?.includes(sessionStorage.getItem("id") || "idk tuka triabva da napisha neshto") || false;
          this.likersCount = data.followers?.length || 0;
          this.workTypes = data.workTypes || this.workTypes;
          this.workPlace = data.workPlace || this.workPlace;
          // this.ghProfileData = data.ghProfileData || false;
          this.getGeocoordsByAddress();
        },
        error: (err) => {
          this.loading = false;
          alert('Something went wrong!');
        },
      });
    });
  }

  getGeocoordsByAddress() {
    this.httpClient
      .get<any>(
        `http://dev.virtualearth.net/REST/v1/Locations?countryRegion=${this.country}&locality=${this.city}&addressLine=${this.address}&includeNeighborhood=1&maxResults=1&key=AhdwRrr6Vw7sNf-VhQTdtQ3J9_O4qxCOjW1PK5lEFpsW48FMozs07L58sw2q3VLG`
      )
      .subscribe({
        next: async (data) => {
          let coords: number[] =
            data.resourceSets[0].resources[0].point.coordinates;
          this.geocoords.next(coords);
        },
      });
  }

  updatePublicProfileDataHandler(
    description: string,
    address: string,
    city: string,
    country: string
  ) {
    this.loading = true;
    this.profileService.updateProfile(description, address, city, country, this.workTypes, this.workPlace).subscribe({
      next: (data) => {
        this.loading = false;
        this.country = country;
        this.address = address;
        this.description = description;
        this.city = city;
        this.editing = false;
        this.getGeocoordsByAddress();
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 401){ return; }
        alert("Something went wrong!");
      }
    });
  }

  updateLinksHandler(facebook: string, instagram: string, twitter: string, linkedin: string, github: string, leetcode: string){
    this.profileService.updateLinks(facebook, instagram, twitter, linkedin, github, leetcode).subscribe({
      next: (data) => {
        this.loading = false;
        this.facebook = facebook;
        this.instagram = instagram;
        this.twitter = twitter;
        this.linkedIn = linkedin;
        this.gitHub = github;
        this.editing_links = false;
      },
      error: (err) => {
        this.loading = false;
        if(err.status === 401){ return; }
        alert("Something went wrong!");
      }
    });
  }

  likeAccountHandler() {
    this.profileService.likeProfile(this._id).subscribe({
      next: (data) => {
        this.liked = !this.liked;
        this.likersCount += this.liked ? 1 : -1;
      },
      error: (err) => {
        if (err.status === 403) {
          alert('You cannot do that!');
          return;
        }
        alert('Something went wrong!');
      },
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
