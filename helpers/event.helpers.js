const moment = require('moment');
moment().format();

module.exports = (hbs) => {

  hbs.registerHelper('isOwner', (event, user, schedule, options) => {
    let isJoined = 'Join group';
    let route = 'join';

    if (event.owner.toString() === user.id) {
      route = 'delete';
      isJoined = 'Delete event';

    } else {
      if ( schedule.length !== 0 ) {
        for (let i = 0; i < schedule.length; i++) {
          if ( schedule[i].user.toString() === user.id ){
            isJoined = 'Leave group';
            route = 'leave'
          } 
        }
      }
    }
    return `<form action=\"/events/${event.id}/${route}\" method=\"post\" class=\"center\">
              <button id=\"join-button\" type=\"submit\" class=\"btn btn-primary\">${isJoined}</button>
            </form>`
  })


  hbs.registerHelper('countParticipants', (participants, options) => {
    let html = '<div class=\"prueba\">';
    const otherParticipants = participants.length - 3;
    if ( participants.length > 3 ) {
      for ( let i = 0; i < 3; i++ ) {
        html += `<div class=\"attendees\">
                  <div class=\"attendees-pic-container\">
                    <img class=\"attendee-pic rounded-circle" src=\"${participants[i].user.photo}\" alt=\"profile pic\">
                  </div>
                    <div class=\"attendee-name\">
                    <p>${participants[i].user.name}</p>
                  </div>
                </div>`
      }
      html += `</div>
              <div>
                <h5 class="more-participants">...and other ${otherParticipants} will attend</h5>
              </div>`;
      return html;
    } else {
      for ( let i = 0; i < participants.length; i++ ) {
        html += `<div class=\"attendees\">
                  <div class=\"attendees-pic-container\">
                    <img class=\"attendee-pic rounded-circle" src=\"${participants[i].user.photo}\" alt=\"profile pic\">
                  </div>
                    <div class=\"attendee-name\">
                    <p>${participants[i].user.name}</p>
                  </div>
                </div>`

      }
      return html;
    }
  })

}
