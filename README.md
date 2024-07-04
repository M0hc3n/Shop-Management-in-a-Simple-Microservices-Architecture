# Shop-Management-in-a-Simple-Microservices-Architecture

 The following is a simple shop management application that incorporates the microservices architecture. It uses 6 different applications (both client side, and backend) to manage the shop needs in the following way:
 - **Client Side**: Used by the user to perform CRUD operations on clients or purchases.
 - **Client (Customers) Service**: a backend service that manages CRUD operations on clients.
 - **Purchases Service**: a backend service that manages CRUD operations on purchases.
 - **Query Service**: a backend service that is used by the client side to fetch clients along with their purchases and display them to the managers).
 - **Validation Service**: a backend service used by the managers (client side) to validate purchases payments (do not get over-hyped, it is a simple toggle :)) )
 - **Events Service**: a service whose job is to broadcast incoming events from a particular service to the rest of the services. Why using it? because different services need to store some kind of *information* (or let's call it *state*) about other services. In my case, I used it to update the Database in each server (I got too lazy to set up a central one, so I kept it local wrt each service).

 This graph shows the project outline in brief:
 
 ![Flowcharts](https://github.com/Mohcen2311/Shop-Management-in-a-Simple-Microservices-Architecture/assets/101293365/601d12b6-8493-4fe7-9ae7-48addca91e84)

### Credits:
I went through this [repo](https://github.com/iamrishupatel/simple-microservices) to learn about dockerisation and how to manage those microservices in deployment (preparing yaml configuration files...), and I've also inspired the idea of the services from it, so it is a good starter to consider.
