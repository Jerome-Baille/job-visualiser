// import React from "react";

// class Create extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             jobName: "",
//             company: "",
//             location: "",
//             type: "Remote",
//             link: "",
//             date: ""
//         };
    
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//       }
    
//       handleChange(event) {
//         const name = event.target.name;
//         const value = event.target.value;
        
//         this.setState({
//             [name]: value
//         });
//       }
    
//       handleSubmit() {
//         fetch('https://jb-jat.herokuapp.com/api/new', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: '1',
//                 name: this.state.jobName,
//                 company: this.state.company,
//                 location: this.state.location,
//                 type: this.state.type,
//                 link: this.state.link,
//                 date: this.state.date
//             })
//         });
//       }

//     render() {
//         return (
//             <div className="contact-form">
//                 <form onSubmit={this.handleSubmit}>
//                     <label>
//                     Poste :
//                         <input 
//                             type="text" 
//                             name="jobName"
//                             value={this.state.jobName} 
//                             onChange={this.handleChange}    
//                         />
//                     </label>
//                     <label>
//                     Entreprise :
//                         <input 
//                             type="text" 
//                             name="company"
//                             value={this.state.company} 
//                             onChange={this.handleChange} 
//                         />
//                     </label>
//                     <label>
//                     Localisation :
//                         <input 
//                             type="text" 
//                             name="location"
//                             value={this.state.location} 
//                             onChange={this.handleChange} 
//                         />
//                     </label>
//                     <label>
//                     Type de poste :
//                         <select value={this.state.type} name="type" onChange={this.handleChange}>
//                             <option value="Remote">Remote</option>
//                             <option value="Hybrid">Hybrid</option>
//                             <option value="On Site">On Site</option>
//                         </select>
//                     </label>
//                     <label>
//                     Lien :
//                         <input 
//                             type="text" 
//                             name="link"
//                             value={this.state.link} 
//                             onChange={this.handleChange} 
//                         />
//                     </label>
//                     <label>
//                     Date :
//                         <input 
//                             type="text" 
//                             name="date"
//                             value={this.state.date} 
//                             onChange={this.handleChange} 
//                         />
//                     </label>
//                     <input type="submit" value="Envoyer" />
//                 </form>
//             </div>
  
//         );
//       }
// }

// export default Create;