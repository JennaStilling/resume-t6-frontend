export const loadTemplateFive = (user, dropdownSections) => {
  const styles = `
    .content { 
      font-family: Arial, Helvetica, sans-serif; 
      padding: 10px;
      background-color: white;
    }
    h1 {
      color: #5e9d85;
      text-align: left;
      background-color: #E4EFEC;
      padding: 11px;
      font-weight: 1000;
    }
    h2{
      margin-left: 0;
      margin-right: 0;
      padding-left: 0;
      padding-right: 0;
      color: #5e9d85;
    }
    hr{
      color: #5e9d85;
      background-color: #5e9d85;
      border: 1px solid #5e9d85;
    }
    h4{
      color: #5e9d85;
      background-color: #E4EFEC;
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
        <h1><br>${user.fName} ${user.lName} <br> <div style="font-size: 16px; font-weight: light;">${user.email}</div></h1>
  `;

  content += '<div style="height: 10px;"></div>';
  // Add Education section
  const selectedEducation = dropdownSections.education.items.filter(item => item.isSelected);

  // Sort education items by graduation date, most recent first
  selectedEducation.sort((a, b) => {
    const dateA = new Date(a.graduation_date);
    const dateB = new Date(b.graduation_date);
    return dateB - dateA; // Sort in descending order (most recent on top)
  });

  if (selectedEducation.length) {
    content += '<h2>Education</h2><hr><ul>';

    selectedEducation.forEach(educationItem => {
      const gpaText = Number.isInteger(educationItem.gpa) ? `${educationItem.gpa}.0` : educationItem.gpa;
      const formattedDate = educationItem.graduation_date ? new Date(educationItem.graduation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
      
      content += `<li style="display: flex; justify-content: space-between;">
          <strong>${educationItem.institution}</strong>
          ${educationItem.graduation_date ? '<span>Graduation:</span>' : ''}
        </li>`;
      
      content += `<li style="display: flex; justify-content: space-between;">
          <em>${educationItem.degree}</em>
          <span>${formattedDate}</span>
        </li>`;
      
      content += `<li>GPA: ${gpaText}</li>`;

      // Add Courses under each Education
      const selectedCourses = educationItem.courses.filter(course => course.isSelected);
      if (selectedCourses.length) {
        content += `<h4 style="font-weight: bold; margin: 10px 0; text-align: left; display: inline;">▸Courses:</h4>`;
        
        // Create an array to hold the course strings
        const courseList = selectedCourses.map(course => {
          return course.grade ? `${course.name}: ${course.grade}` : course.name;
        });

        content += `<p style="margin-left: 10px; font-style: italic; display: inline;"> ${courseList.join(', ')}</p>`;
      }
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

  // Add Skills section
  const selectedSkills = dropdownSections.skills.items.filter(item => item.isSelected);
  if (selectedSkills.length) {
    content += '<h2>Skills</h2><hr><div style="height: 5px;"></div><div style="display: flex; flex-wrap: wrap; gap: 10px;">';
    selectedSkills.forEach(item => {
      content += `<div style="background-color: #5e9d85; color: white; padding: 5px 10px; border-radius: 5px; margin: 5px;">${item.name}</div>`;
    });
    content += '</div>';
    content += `<div style="height: 5px;"></div>`;
  }
  
  content += `
        </div>
      </body>
    </html>
  `;
  return content;
};