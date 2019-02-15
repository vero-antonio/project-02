module.exports = (hbs) => {
  hbs.registerHelper('isOwner', (event, user, schedule, options) => {
    if (event.owner.toString() === user.id) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

  hbs.registerHelper('isJoined', (event, user, schedule, options) => {
    let isJoined = false;
    for (let i = 0; i < schedule.length; i++) {
      if ( schedule[i].user.toString() === user.id ){
        isJoined = true;
      }
    }
    if (isJoined === true) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
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
        html += `<div class=\"col-sm-4 attendees\">
                  <div class=\"row attendee-pic\">
                    <img class=\"rounded-circle" src=\"${participants[i].user.photo}\" alt=\"profile pic\">
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


