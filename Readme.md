# on-point-analytics
Analytics of twitter feed

The attempt with this project is to obtain twitter feeds from EMCWorld and VMworld and analyze relationships between products or concepts such as VMware products and data protection as an example. The idea is that this will give us some insight into what people are talking about the most; which areas we should focus on etc. 

9-8-2016
So far we have successfully interfaced with the twitter API and fetched tweets from EMCWorld 2016 and VMworld 2016. The issue yet to be resolved is to be able to loop through and get the 1500 freely available tweets from twitter. With one REST request, it only sends back 100 tweets. To fetch the rest of the 1400 tweets, we probably need to put the request in a loop to fetch all the 1500 tweets - unless there's a better way.

For starters, we got the 1500 tweets with 15 separate requests (this does not scale, we know!) and run it through a filter to analyze how many tweets we get in certain categories. This information is displayed to a UI. The technology used here is angularjs.

We tried to run these tweets through a data analytics engine but ran into some technical glitches with the machine learning libraries we were using.

Next steps:
1. More work on the node server.js to cleanly fetch the 1500 tweets allowed. 
2. Add filters and/or analytics to analyze the data further.

This could be made into a more general purpose app where twitter feeds are obtained for a certain topic and the output might be something like a scatter graph from which we might be able to draw inferences on the associations or relationships in the data retrieved.



