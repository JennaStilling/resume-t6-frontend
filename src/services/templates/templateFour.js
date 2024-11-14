export const loadTemplateFour = (user, dropdownSections) => {
    const styles = `
      .content { font-family: "Goudy Bookletter 1911", sans-serif; }
      h1 {
        color: black;
        text-align: center;
      }
      h2{
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
      }
      h4{
        text-align: center;
        font-weight: normal;
      }
      ul {
        list-style-type: none;
        padding: 5px;
      }
      ol {
        list-style-type: decimal;
      }
    `;
    let content = `
      <html>
      <head>
        <style>${styles}</style>
      </head>
      <body>
        <div id="pdf-content" class="content">
          <h1>${user.fName} ${user.lName}</h1>
          <h4>${user.email}</h4>
    `;

    content += `<div style="height: 5px;"></div>`;

    // Add Experience section
    const selectedExperience = dropdownSections.experience.items.filter(item => item.isSelected);
    if (selectedExperience.length) {
      content += '<br><h2><hr>PROFESSIONAL EXPERIENCE</h2><hr><ul>';
      selectedExperience.forEach(item => {
        const startDate = item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
        const endDate = item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
        const roleCompany = `<div text-decoration: underline>${item.role}, </div> ${item.company}`;
       
        content += `<li style="display: flex; justify-content: space-between;">
            <strong>${roleCompany}</strong>
            <span> ${startDate} - ${endDate}</span>
          </li>`;
        content += `<li> • ${item.job_description}</li>`;
      });
      content += '</ul>';
    }
  
    // Add Education section
    const selectedEducation = dropdownSections.education.items.filter(item => item.isSelected);
    if (selectedEducation.length) {
      content += '<h2><hr>EDUCATION</h2><hr><ul>';
      selectedEducation.forEach(item => {
        const gpaText = Number.isInteger(item.gpa) ? `${item.gpa}.0` : item.gpa;
        const formattedDate = item.graduation_date ? new Date(item.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        content += `<li style="display: flex; justify-content: space-between;">
            <strong>${item.institution}</strong>
            ${item.graduation_date ? '<span>Graduation:</span>' : ''}
          </li>`;
        content += `<li style="display: flex; justify-content: space-between;">
            <em>${item.degree}, GPA: ${gpaText} </em>
            <span>${formattedDate}</span>
          </li>`;
        content += `<div style="height: 5px;"></div>`;
      });
      content += '</ul>';
    }
  
    // Add Certifications section
    const selectedCertifications = dropdownSections.certifications.items.filter(item => item.isSelected);
    if (selectedCertifications.length) {
      content += '<h2><hr>CERTIFICATIONS</h2><hr><ul>';
      selectedCertifications.forEach(item => {
        const formattedDate = item.date_acquired ? new Date(item.date_acquired).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
        content += `<li style="display: flex; justify-content: space-between;">
        <strong>${item.name}</strong>
        <span>Date Acquired:</span>
      </li>`;
        content += `<li style="display: flex; justify-content: space-between;">
        <em>${item.company}</em> 
        <span>${formattedDate}</span>
        </li>`; 
        content += `<div style="height: 5px;"></div>`;
      });
      content += '</ul>';
    }
  
    // Add Projects section
    const selectedProjects = dropdownSections.projects.items.filter(item => item.isSelected);
    if (selectedProjects.length) {
      content += '<h2><hr>PROJECTS</h2><hr><ol>';
      selectedProjects.forEach(item => {
        content += `<li><b>${item.name}</b>`;
        if (item.description) {
          content += `: ${item.description}`;
        }
        content += `</li>`;
      });
      content += '</ol>';
      content += `<div style="height: 5px;"></div>`;
    }

    // Add Skills section
    const selectedSkills = dropdownSections.skills.items.filter(item => item.isSelected);
    if (selectedSkills.length) {
      content += '<h2><hr>SKILLS</h2><hr><ol>';
      selectedSkills.forEach(item => {
        content += `<li><b>${item.name}</b>`;
        if (item.description) {
          content += `: ${item.description}`;
        }
        content += `</li>`;
      });
      content += '</ol>';
      content += `<div style="height: 5px;"></div>`;
    }

    content += `
          </div>
        </body>
      </html>
    `;
    return content;
  };