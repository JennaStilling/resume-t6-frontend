export const loadTemplateOne = (user, dropdownSections) => {
    const styles = `
      .content { font-family: 'Times New Roman', Times, serif; }
      h1 {
        color: black;
        text-align: center;
      }
      h2{
        margin-left: 0;
        margin-right: 0;
        padding-left: 0;
        padding-right: 0;
      }
      h4{
        text-align: center;
        font-weight: normal;
      }
      ul {
        list-style-type: none;
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
  
    // Add Education section
    const selectedEducation = dropdownSections.education.items.filter(item => item.isSelected);
    if (selectedEducation.length) {
      content += '<h2>Education</h2><hr><ul>';
      selectedEducation.forEach(item => {
        const gpaText = Number.isInteger(item.gpa) ? `${item.gpa}.0` : item.gpa;
        const formattedDate = item.graduation_date ? new Date(item.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        content += `<li style="display: flex; justify-content: space-between;">
            <strong>${item.institution}</strong>
            ${item.graduation_date ? '<span>Graduation:</span>' : ''}
          </li>`;
        content += `<li style="display: flex; justify-content: space-between;">
            <em>${item.degree}</em>
            <span>${formattedDate}</span>
          </li>`;
        content += `<li>GPA: ${gpaText}</li>`;
        content += `<div style="height: 5px;"></div>`;
      });
      content += '</ul>';
    }
  
    // Add Experience section
    const selectedExperience = dropdownSections.experience.items.filter(item => item.isSelected);
    if (selectedExperience.length) {
      content += '<h2>Experience</h2><hr><ul>';
      selectedExperience.forEach(item => {
        const startDate = item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
        const endDate = item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '';
        const roleCompany = `${item.role}, ${item.company}`;
       
        content += `<li style="display: flex; justify-content: space-between;">
            <strong>${roleCompany}</strong>
            <span> ${startDate} - ${endDate}</span>
          </li>`;
        content += `<li> • ${item.job_description}</li>`;
      });
      content += '</ul>';
    }
  
    // Add Certifications section
    const selectedCertifications = dropdownSections.certifications.items.filter(item => item.isSelected);
    if (selectedCertifications.length) {
      content += '<h2>Certifications</h2><hr><ul>';
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
  
    // Add Skills section
    const selectedSkills = dropdownSections.skills.items.filter(item => item.isSelected);
    if (selectedSkills.length) {
      content += '<h2>Skills</h2><hr><ol>';
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
  
    // Add Projects section
    const selectedProjects = dropdownSections.projects.items.filter(item => item.isSelected);
    if (selectedProjects.length) {
      content += '<h2>Projects</h2><hr><ol>';
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
    content += `
          </div>
        </body>
      </html>
    `;
    return content;
  };