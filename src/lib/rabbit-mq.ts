import amqplib from 'amqplib';

export const insertIntoQueue = async function name(message: string) {
    
    const queue = String(process.env.RABBITMQ_QUEUE);
    const conn = await amqplib.connect(String(process.env.RABBITMQ_URL));
  
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    const addMessage = ch1.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue ${queue} with message ${addMessage}`);
    await ch1.close();

    return addMessage;

}

