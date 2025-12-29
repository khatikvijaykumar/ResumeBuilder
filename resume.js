
 let resumeData = {
    experience: [],
    education: [],
    projects: []
};

 let currentTab = 'personal';
let showTips = true;

 const tips = {
    personal: "Start with your basic information. Make sure your email is professional!",
    experience: "List your most recent job first. Include achievements and results, not just duties.",
    education: "Add your degrees, certifications, or relevant coursework.",
    projects: "Showcase personal or academic projects. Great for students and career changers!",
    skills: "List technical and soft skills. Separate with commas like: JavaScript, React, Python"
};

 function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

 window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    updateProgress();
});

 function updateProgress() {
    const fields = [
        document.getElementById('name').value,
        document.getElementById('title').value,
        document.getElementById('email').value,
        document.getElementById('phone').value,
        document.getElementById('summary').value,
        resumeData.experience.length > 0,
        resumeData.education.length > 0,
        document.getElementById('skills').value
    ];
    
    const filledFields = fields.filter(f => f).length;
    const progress = (filledFields / fields.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

 function toggleTips() {
    showTips = !showTips;
    document.getElementById('tipBox').style.display = showTips ? 'block' : 'none';
}

 function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => {
        if (t.textContent.toLowerCase().includes(tab.substring(0, 4))) {
            t.classList.add('active');
        }
    });
    
    const section = document.getElementById(`${tab}-section`);
    if (section) section.style.display = 'block';
    
    currentTab = tab;
    document.getElementById('tipBox').textContent = tips[tab];
}

 function addExperience() {
    const id = Date.now();
    resumeData.experience.push({ id, company: '', position: '', duration: '', description: '' });
    renderExperience();
}

 function renderExperience() {
    const list = document.getElementById('experience-list');
    if (resumeData.experience.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No experience added yet.</p><p style="font-size: 14px;">Click the button below to add your first job!</p></div>';
    } else {
        list.innerHTML = resumeData.experience.map(exp => `
            <div class="card">
                <button class="btn btn-danger card-delete" onclick="deleteExperience(${exp.id})">🗑️</button>
                <div class="form-group">
                    <label>Position Title</label>
                    <input type="text" placeholder="e.g., Junior Developer" value="${exp.position}" oninput="updateExperience(${exp.id}, 'position', this.value)">
                </div>
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" placeholder="e.g., Tech Company Inc." value="${exp.company}" oninput="updateExperience(${exp.id}, 'company', this.value)">
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" placeholder="e.g., Jan 2022 - Present" value="${exp.duration}" oninput="updateExperience(${exp.id}, 'duration', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="Describe your responsibilities and achievements" oninput="updateExperience(${exp.id}, 'description', this.value)">${exp.description}</textarea>
                </div>
            </div>
        `).join('');
    }
}

 function updateExperience(id, field, value) {
    const exp = resumeData.experience.find(e => e.id === id);
    if (exp) exp[field] = value;
    updatePreview();
}

 function deleteExperience(id) {
    resumeData.experience = resumeData.experience.filter(e => e.id !== id);
    renderExperience();
    updatePreview();
}

 function addEducation() {
    const id = Date.now();
    resumeData.education.push({ id, institution: '', degree: '', year: '' });
    renderEducation();
}

 function renderEducation() {
    const list = document.getElementById('education-list');
    if (resumeData.education.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No education added yet.</p><p style="font-size: 14px;">Add your degrees or certifications!</p></div>';
    } else {
        list.innerHTML = resumeData.education.map(edu => `
            <div class="card">
                <button class="btn btn-danger card-delete" onclick="deleteEducation(${edu.id})">🗑️</button>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" placeholder="e.g., Bachelor of Computer Science" value="${edu.degree}" oninput="updateEducation(${edu.id}, 'degree', this.value)">
                </div>
                <div class="form-group">
                    <label>Institution</label>
                    <input type="text" placeholder="e.g., State University" value="${edu.institution}" oninput="updateEducation(${edu.id}, 'institution', this.value)">
                </div>
                <div class="form-group">
                    <label>Year</label>
                    <input type="text" placeholder="e.g., 2019 - 2023" value="${edu.year}" oninput="updateEducation(${edu.id}, 'year', this.value)">
                </div>
            </div>
        `).join('');
    }
}

 function updateEducation(id, field, value) {
    const edu = resumeData.education.find(e => e.id === id);
    if (edu) edu[field] = value;
    updatePreview();
}

 function deleteEducation(id) {
    resumeData.education = resumeData.education.filter(e => e.id !== id);
    renderEducation();
    updatePreview();
}

 function addProject() {
    const id = Date.now();
    resumeData.projects.push({ id, name: '', description: '', technologies: '', link: '' });
    renderProjects();
}

 function renderProjects() {
    const list = document.getElementById('projects-list');
    if (resumeData.projects.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No projects added yet.</p><p style="font-size: 14px;">Showcase your portfolio projects!</p></div>';
    } else {
        list.innerHTML = resumeData.projects.map(proj => `
            <div class="card">
                <button class="btn btn-danger card-delete" onclick="deleteProject(${proj.id})">🗑️</button>
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" placeholder="e.g., E-commerce Website" value="${proj.name}" oninput="updateProject(${proj.id}, 'name', this.value)">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="3" placeholder="What did you build? What features does it have?" oninput="updateProject(${proj.id}, 'description', this.value)">${proj.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" placeholder="e.g., React, Node.js, MongoDB" value="${proj.technologies}" oninput="updateProject(${proj.id}, 'technologies', this.value)">
                </div>
                <div class="form-group">
                    <label>Project Link (Optional)</label>
                    <input type="text" placeholder="e.g., github.com/username/project" value="${proj.link}" oninput="updateProject(${proj.id}, 'link', this.value)">
                </div>
            </div>
        `).join('');
    }
}

 function updateProject(id, field, value) {
    const proj = resumeData.projects.find(p => p.id === id);
    if (proj) proj[field] = value;
    updatePreview();
}

 function deleteProject(id) {
    resumeData.projects = resumeData.projects.filter(p => p.id !== id);
    renderProjects();
    updatePreview();
}

 function updatePreview() {
    document.getElementById('preview-name').textContent = document.getElementById('name').value || 'Your Name';
    document.getElementById('preview-title').textContent = document.getElementById('title').value || 'Your Job Title';
    
    const contact = [];
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    
    if (email) contact.push(email);
    if (phone) {
        if (contact.length > 0) contact.push('•');
        contact.push(phone);
    }
    if (location) {
        if (contact.length > 0) contact.push('•');
        contact.push(location);
    }
    
    document.getElementById('preview-contact').innerHTML = contact.join(' ');

     const summary = document.getElementById('summary').value;
    if (summary) {
        document.getElementById('preview-summary-section').style.display = 'block';
        document.getElementById('preview-summary').textContent = summary;
    } else {
        document.getElementById('preview-summary-section').style.display = 'none';
    }

     if (resumeData.experience.length > 0) {
        document.getElementById('preview-experience-section').style.display = 'block';
        document.getElementById('preview-experience').innerHTML = resumeData.experience.map(exp => `
            <div class="resume-item">
                <div class="resume-item-header">
                    <div class="resume-item-title">${exp.position || 'Position'}</div>
                    <div style="color: #718096; font-size: 12px;">${exp.duration}</div>
                </div>
                <div class="resume-item-subtitle">${exp.company || 'Company'}</div>
                ${exp.description ? `<p class="resume-item-description">${exp.description}</p>` : ''}
            </div>
        `).join('');
    } else {
        document.getElementById('preview-experience-section').style.display = 'none';
    }

     if (resumeData.projects.length > 0) {
        document.getElementById('preview-projects-section').style.display = 'block';
        document.getElementById('preview-projects').innerHTML = resumeData.projects.map(proj => `
            <div class="resume-item">
                <div class="resume-item-header">
                    <div class="resume-item-title">${proj.name || 'Project Name'}</div>
                    ${proj.link ? `<div style="color: #667eea; font-size: 12px;">${proj.link}</div>` : ''}
                </div>
                ${proj.description ? `<p class="resume-item-description">${proj.description}</p>` : ''}
                ${proj.technologies ? `<p style="color: #718096; font-size: 12px; margin-top: 5px;"><strong>Technologies:</strong> ${proj.technologies}</p>` : ''}
            </div>
        `).join('');
    } else {
        document.getElementById('preview-projects-section').style.display = 'none';
    }

     if (resumeData.education.length > 0) {
        document.getElementById('preview-education-section').style.display = 'block';
        document.getElementById('preview-education').innerHTML = resumeData.education.map(edu => `
            <div class="resume-item">
                <div class="resume-item-header">
                    <div class="resume-item-title">${edu.degree || 'Degree'}</div>
                    <div style="color: #718096; font-size: 12px;">${edu.year}</div>
                </div>
                <div style="color: #4a5568; font-size: 14px;">${edu.institution || 'Institution'}</div>
            </div>
        `).join('');
    } else {
        document.getElementById('preview-education-section').style.display = 'none';
    }

     const skillsText = document.getElementById('skills').value;
    if (skillsText) {
        const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
        if (skills.length > 0) {
            document.getElementById('preview-skills-section').style.display = 'block';
            document.getElementById('preview-skills').innerHTML = skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
        } else {
            document.getElementById('preview-skills-section').style.display = 'none';
        }
    } else {
        document.getElementById('preview-skills-section').style.display = 'none';
    }
    
    updateProgress();
}

 function loadSampleData() {
    document.getElementById('name').value = 'Vijay Kumar';
    document.getElementById('title').value = 'Game Developer';
    document.getElementById('email').value = 'xyz@email.com';
    document.getElementById('phone').value = '+91 23456 56734';
    document.getElementById('location').value = 'India';
    document.getElementById('summary').value = 'Passionate frontend developer with experience in React and modern web technologies. Enthusiastic about creating user-friendly interfaces and learning new technologies.';
    document.getElementById('skills').value = 'React, JavaScript, HTML/CSS, Git, Tailwind CSS, Problem Solving';

     resumeData.experience = [{
        id: 1,
        company: 'Tech Startup Inc.',
        position: 'Junior Developer',
        duration: 'Jan 2023 - Present',
        description: 'Developed responsive web applications using React and Tailwind CSS. Collaborated with design team to implement user-friendly interfaces.'
    }];

     resumeData.education = [{
        id: 1,
        institution: 'State University',
        degree: 'Bachelor of Science in Computer Science',
        year: '2021 - 2025'
    }];

     resumeData.projects = [{
        id: 1,
        name: 'E-commerce Website',
        description: 'Built a full-stack online store with shopping cart and payment integration',
        technologies: 'React, Node.js, MongoDB',
        link: 'github.com/username/ecommerce'
    }];

     renderExperience();
    renderEducation();
    renderProjects();
    updatePreview();
}

 function downloadPDF() {
    const element = document.getElementById('resume-preview');
    const name = document.getElementById('name').value || 'Resume';
    const opt = {
        margin: 0,
        filename: `${name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

 renderExperience();
renderEducation();
renderProjects();

