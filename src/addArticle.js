import { element } from 'prop-types'
import React, { PureComponent } from 'react'
const COUTRY_LIST = [
  "Aruba", "Qatar", "Slovakia", "Venezuela (Bolivarian Republic)", "Italy", "Peru", "Spain", "South Africa", "Andorra", "Bosnia and Herzegovina",
  "Oman", "Papua New Guinea", "Bermuda", "Cambodia", "Congo (Kinshasa)", "Palestinian Territory", "Antarctica", "Hungary", "Latvia", "Maldives",
  "Nepal", "Bahrain", "Czech Republic", "Malaysia", "Norfolk Island", "Turkmenistan", "Gibraltar", "Macedonia, Republic of", "Solomon Islands",
  "Zimbabwe", "Bolivia", "Guatemala", "Holy See (Vatican City State)", "Liechtenstein", "Madagascar", "New Caledonia", "South Georgia and the South Sandwich Islands",
  "Tunisia", "French Guiana", "Kyrgyzstan", "Lesotho", "Marshall Islands", "Suriname", "Afghanistan", "Libya", "Puerto Rico", "Antigua and Barbuda",
  "Georgia", "Mozambique", "Pitcairn", "South Sudan", "Svalbard and Jan Mayen Islands", "American Samoa", "Belgium", "Germany", "Lithuania", "New Zealand",
  "Saint Helena", "Sao Tome and Principe", "Ireland", "Poland", "Viet Nam", "Chad", "Honduras", "Croatia", "Fiji", "Albania", "Heard and Mcdonald Islands",
  "Finland", "France", "Tonga", "Turks and Caicos Islands", "Iran, Islamic Republic of", "Niger", "Norway", "Seychelles", "Sierra Leone", "Vanuatu", "Barbados",
  "Japan", "Tanzania, United Republic of", "Guernsey", "Mauritania", "Pakistan", "Singapore", "Uganda", "Uzbekistan", "Cameroon", "Kiribati", "Mauritius",
  "Dominica", "Faroe Islands", "Kazakhstan", "Palau", "Slovenia", "Trinidad and Tobago", "Guinea-Bissau", "Haiti", "Kuwait", "Monaco", "Grenada", "Guam", "Iceland",
  "Jamaica", "Montenegro", "Falkland Islands (Malvinas)", "Niue", "Tajikistan", "Belarus", "French Polynesia", "Senegal", "Serbia", "Gabon", "Macao, SAR China",
  "Saint-Martin (French part)", "Burkina Faso", "Mayotte", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Bouvet Island", "Cyprus", "Portugal", "United Arab Emirates",
  "United States of America", "Myanmar", "Namibia", "Paraguay", "Israel", "Martinique", "Botswana", "Estonia", "Netherlands Antilles", "Algeria", "Bhutan",
  "El Salvador", "Taiwan, Republic of China", "British Indian Ocean Territory", "Cuba", "Luxembourg", "Mongolia", "Saint Lucia", "ALA Aland Islands", "Burundi",
  "Ecuador", "United Kingdom", "Indonesia", "Malawi", "Netherlands", "US Minor Outlying Islands", "Yemen", "Costa Rica", "Côte d'Ivoire", "Korea (South)",
  "Tokelau", "Benin", "Somalia", "British Virgin Islands", "Bulgaria", "Cocos (Keeling) Islands", "Egypt", "Moldova", "Morocco", "Philippines", "Russian Federation",
  "Rwanda", "Saudi Arabia", "Tuvalu", "Uruguay", "Wallis and Futuna Islands", "Argentina", "Brazil", "India", "Northern Mariana Islands", "Saint Kitts and Nevis",
  "Ukraine", "Central African Republic", "Kenya", "Lao PDR", "Bangladesh", "Greenland", "Panama", "Saint Vincent and Grenadines", "Nigeria", "Syrian Arab Republic (Syria)",
  "Azerbaijan", "Belize", "Iraq", "Nauru", "Anguilla", "Montserrat", "Bahamas", "Isle of Man", "Liberia", "Micronesia, Federated States of", "Ethiopia", "Saint-Barthélemy",
  "Timor-Leste", "Cayman Islands", "Equatorial Guinea", "Gambia", "Romania", "Togo", "Cape Verde", "Malta", "Sri Lanka", "Republic of Kosovo", "Guadeloupe", "Jordan",
  "Thailand", "Virgin Islands, US", "Western Sahara", "Ghana", "Jersey", "Sudan", "Angola", "Austria", "French Southern Territories", "Réunion", "Swaziland", "Zambia",
  "Comoros", "Eritrea", "Canada", "Mexico", "Australia", "Hong Kong, SAR China", "China", "Mali", "Brunei Darussalam", "Chile", "Korea (North)", "Armenia", "Cook Islands",
  "Greece", "Turkey", "Colombia", "Djibouti","Guinea", "Guyana", "Sweden", "Switzerland", "Dominican Republic", "Nicaragua", "Christmas Island", "Denmark", "Congo (Brazzaville)", "Lebanon"
]

export default class AddArticle extends PureComponent {
  render() {
    return (
      <div class="container-fluid">
          <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}/>
            <label for="floatingTextarea2">content</label>
          </div>
          <div class="form-floating">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
              <option selected>Worldwide</option>
              {COUTRY_LIST.sort().map((element) =>(
                <option value={element}>{element}</option>
              ))}
            </select>
            <label for="floatingSelect">Select a country</label>
          </div>
      </div>
    )
  }
}