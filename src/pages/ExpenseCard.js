import React from 'react';
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px', // Optional padding around the container
    },
    card: {
        width: '700px',  
        height: '600px',  
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '250px',  
        objectFit: 'cover',
    },
    content: {
        padding: '20px',  
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '24px',  
        margin: '0 0 10px 0',
    },
    date: {
        fontSize: '16px',
        color: '#888',
        margin: '10px 0 0 0',
    },
    item: {
        padding: '10px',
        borderBottom: '1px solid #555',
      }
};

const ExpenseCard = ({props}) => {
    // const { records } = props;  
    console.log("User data :",props);
        return (
        <div style={styles.container}>
            <div style={styles.card}>   
                <img src={"https://i.ibb.co/7XtF6vv/bfdff0c4-d5a3-442f-88bc-90239b6863b2.jpg"} alt="Expense" style={styles.image} />
                <div style={styles.content}>
                    <h3 style={styles.title}> <strong>Amount: </strong>{props.amount}</h3>
                    <div style={styles.date}>Date: {props.date}</div>
                    <div style={styles.item}><strong>Type:</strong>{props.type}</div>
                    <div style={styles.item}><strong>Category:</strong>{props.category}</div>
                    <div style={styles.item}><strong>Reference:</strong>Cras justo odio</div>
                    <div style={styles.item}><strong>description:</strong>{props.description}</div>
                </div>
                {/* console.log(props); */}
            </div>
        </div>
    );
};


export default ExpenseCard;
