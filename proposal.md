**Project Proposal : Visualizing Modern History Armed Conflicts**
-----------------------------

Note: I chose to do this project alone.  I have a full time job, a young child, and thus a complex schedule that I do not want to impose on others.  I will get feedback on my designs and implementations from colleagues and family members.

**Background and Motivation**
-----------------------------
*Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.*

I work as a defence scientist for the Department of National Defence in Canada, so I am primarily interested in  military topics. I considered many project ideas, but few of them do not require the use of classified or sensitive material.  In the end, I decided to concentrate on the recent history (post-WWII) of armed conflicts in the world, a topic that is fully unclassified and has many interesting spatial and temporal components that can be displayed through an interactive visualization.


**Project Objectives**
---------------------
*Provide the primary questions you are trying to answer with your visualization. What would you like to learn and accomplish? List the benefits.*

Hundreds of armed conflicts have occured in the world since World War II (WWII).  This is a lot of data for anybody to grasp.  I want to produce an interactive visualization that will effectively convey information on armed conflicts and allow users to answer the following questions:
* Where in the world (countries and/or regions) have armed conflicts occurred since WWII?
* How many conflicts a particular country or region has been involved in over a given period of time?
* Is there any downward/upward trend in the number of armed conflicts, either  worldwide or in specific countries/regions of interest?
* Do these trends, if any, differ depending on the type and intensity of the conflict?


**Data**
---------
*From where and how are you collecting your data? If appropriate, provide a link to your data sources.*

I intend to use the [Armed Conflict Dataset](http://www.pcr.uu.se/research/ucdp/datasets/ucdp_prio_armed_conflict_dataset/) compiled by the University of Uppsala Conflict Data Program (UCDP) and the International Peace Research Institute, Oslo (PRIO).  I will also use [topoJSON data from Mike Bostock](https://github.com/mbostock/topojson/tree/master/examples) to draw a world map.

**Data Processing**
-------------------
*Do you expect to do substantial data cleanup?*

At first glance, not much cleaning will be required, but I will have to fill some gaps.  Conflict end dates do not appear in all rows, so that will need to be fixed.  I will have to match countries' IDs to countries' names.  I will also have to add the latitude and the longitude of countries' centroids (or capital cities) to the data.

*What quantities do you plan to derive from your data?*

Duration of conflicts, from start and end dates.

*How will data processing be implemented?*

* I will fill out missing end dates in Excel
* I will then compute conflict durations from start and end dates
* I will convert the CSV to JSON


**Visualization**
------------------
*How will you display your data? Provide some general ideas that you have for the visualization design. Include sketches of your design.*

I want to display simultaneously the temporal and spatial aspects of conflicts.  I foresee a world map at the top of the design, and a plot (or maybe a histogram) of conflicts over time at the bottom.  On the left hand side would be pulldowns to filter the data according to intensity or type of conflict.

*Must-Have Features. These are features without which you would consider your project to be a failure.*
World map wih conflict locations, temporal plot of conflicts, filters on conflict intensity and types.

*Optional Features. Those features which you consider would be nice to have, but not critical.*
Brushing of temporal plot, zoom in feature on map

**Project Schedule**
-------------------
**By Apr 12th** : Obtain data, clean it, fill out gaps, convert to JSON.
**By Apr 17th** : Write implementation code structure, page layout, basic page elements in place.
**By Apr 23rd** : First implementation completed with all must-have features, ready for feedback.
**By Apr 30th** : Modifications made based upon feedback received, optional features implemented.
** By May 5th**:  Complete work, make page public, record screencast, and submit project.