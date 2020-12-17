
	class ContactsList extends React.Component{
		constructor(props){
			super(props);
			this.state = {studlist: [], student: "Чынгызов Темирлан"
			 };
	
		}



		componentDidMount(){
			fetch('/getlist')
			.then(res =>res.json())
			.then(json => this.setState({studlist: json}));
			this.click = this.click.bind(this);
		}	
		click(){
			this.setState({student: "Атабаева Азиза"})
		}

		render(){
       			return (
				<div className="contactlist"> 
				<h3>Контакты</h3>
                {this.state.studlist.map(stud =>
                	
                	<p id={stud.id_stud} onClick = {this.props.hclick}>{stud.fam}  {stud.name}</p>
					 
                	 )}



					 <p onClick = {this.click}>{this.state.student}</p>

                </div>
                )
                
            }
  		} 

  		class StidInfo extends React.Component{
  			constructor(props){
  				super(props);
  				this.state = {fio: ""}
  			}
  			render(){
  				return (<div className = "infobox">
  					<h3>Component studinfo</h3>

  					<p>{this.props.fio}</p>  					
  					</div>)
  			}
  		}

  	

     class MessageBox extends React.Component {

     	constructor(props){
     		super(props);

     	}

     	
		render(){
			
			return (<div className = "messagebox">  
		

                  	{this.props.studmes.map(msg => 
                  	<div>{msg.id_stud} {msg.mes_text}</div>)}
				</div>
				

				)
			}}


			class SendMess extends React.Component{

				constructor(props) {
					super(props);
					this.state = {textshange: ""}
					this.handleChange = this.handleChange.bind(this);
					this.Sendmessage = this.Sendmessage.bind(this)
				}
				handleChange(e){
					this.setState({textshange: e.target.value});
				}
				Sendmessage(){ 
			            fetch('/sendmessage?messag=' + this.state.textshange + '&stud_id=' + this.props.id_st)
						
		}
				render(){
					

					if (this.props.visible) {
						return(<div className="sendmes">

							<h2>Component Sendmessage</h2>
							<input type="text" name="mes" onChange = {this.handleChange}/>
							<input type="submit" onClick={this.Sendmessage} />
							</div>)
				}

				else{
					return(<div></div>)
				}
				}
			}



			
			


			class MainParent extends React.Component{
              constructor(props){
              	super(props);
				  this.state = {studmes: [], stud_info: "", visible : false, id_stud: ""}
				  
				   this.handleclick = this.handleclick.bind(this); 
				   this.hendleSendMes = this.hendleSendMes.bind(this);
		
				   
			}
				
		    handleclick(event){

					fetch(`/getstmessage?id_st=${event.target.id}`)
					.then(res =>res.json())
					.then(mes => this.setState({studmes: mes}));
					
			this.handleclick2(event.target.id);
			this.setState({visible: true})
			this.setState({id_stud: event.target.id})

            }
   

            handleclick2(idstud){

					fetch(`/getstinfo?istf=${idstud}`)
					.then(res =>res.json())
					.then(json => this.setState({stud_info: json[0].fio}));
					
			

            }
            hendleSendMes(text){

            }

            
                 

                 render() {
              	 return( <div className="maincomp">
              	 <h1>Main Component</h1>
              	 <div id="mainbox">
              	 <ContactsList  hclick = {this.handleclick}/>
              	 <div>	
              	 <StidInfo fio = {this.state.stud_info}/>
              	 <MessageBox studmes = {this.state.studmes} />
              	 <SendMess sendmes = {this.hendleSendMes}  visible={this.state.visible} id_st = {this.state.id_stud}/>
              	 </div>
              	 </div>
              	 </div>

              		);
              }
			}


		 ReactDOM.render(
		 <MainParent />
		 ,
		 	document.getElementById("app")
		 )

		 


